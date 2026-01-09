import { db } from '../db';
import { calculateZScoresForAllSectors } from './calculateZScores';

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

// Rate limiting helper
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchSectorPrices() {
    console.log('Starting fetchSectorPrices job...');
    const tickers = ['XLK', 'XLF', 'XLE', 'XLV', 'XLI', 'XLY', 'XLP', 'XLU', 'XLB', 'XLRE', 'XLC', 'SPY', 'QQQ', 'IWM'];

    if (!POLYGON_API_KEY) {
        console.error('POLYGON_API_KEY is missing');
        return;
    }

    for (const ticker of tickers) {
        try {
            console.log(`Fetching ${ticker}...`);
            const response = await fetch(
                `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?apiKey=${POLYGON_API_KEY}`
            );

            if (!response.ok) {
                console.error(`Error response for ${ticker}: ${response.status} ${response.statusText}`);
                continue;
            }

            const data = await response.json() as any;

            if (data.status !== 'OK' || !data.results?.[0]) {
                console.error(`Failed to fetch data for ${ticker}:`, data);
                continue;
            }

            const result = data.results[0];
            const price = result.c; // close price
            const volume = result.v;
            const date = new Date(result.t).toISOString().split('T')[0];

            // Validate
            if (price <= 0 || price > 10000 || volume <= 0) {
                console.error(`Invalid data for ${ticker}:`, { price, volume });
                continue;
            }

            // Check for gap vs previous day
            const prevDay = await db.query(
                'SELECT close_price FROM sectors_daily WHERE symbol = $1 ORDER BY date DESC LIMIT 1',
                [ticker]
            );

            if (prevDay.rows[0]) {
                const gap = Math.abs((price - prevDay.rows[0].close_price) / prevDay.rows[0].close_price);
                if (gap > 0.05) {
                    console.warn(`Large gap for ${ticker}: ${(gap * 100).toFixed(2)}%`);
                }
            }

            // Store
            await db.query(
                'INSERT INTO sectors_daily (symbol, date, close_price, volume) VALUES ($1, $2, $3, $4) ON CONFLICT (symbol, date) DO UPDATE SET close_price = EXCLUDED.close_price',
                [ticker, date, price, volume]
            );

            console.log(`✓ Stored ${ticker}: $${price} on ${date}`);

            // Rate limit: Polygon.io free tier = 5 req/min -> 12s per req
            await sleep(12000);

        } catch (error) {
            console.error(`Error fetching ${ticker}:`, error);
        }
    }

    console.log('All prices fetched. Calculating Z-Scores...');
    // After all prices fetched, calculate z-scores
    await calculateZScoresForAllSectors();
    console.log('Job complete.');
}
