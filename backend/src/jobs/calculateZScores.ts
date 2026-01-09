import { db } from '../db';
// import { addDays, format } from 'date-fns';

export async function calculateZScoresForAllSectors() {
    const sectors = ['XLK', 'XLF', 'XLE', 'XLV', 'XLI', 'XLY', 'XLP', 'XLU', 'XLB', 'XLRE', 'XLC'];
    const benchmarks = ['SPY', 'QQQ', 'IWM'];
    const windows = [252, 756, 1260]; // 1Y, 3Y, 5Y in trading days

    for (const sector of sectors) {
        for (const benchmark of benchmarks) {
            for (const window of windows) {
                try {
                    const zscore = await calculateZScore(sector, benchmark, window);

                    if (zscore !== null) {
                        let signal = 'NEUTRAL';
                        if (zscore < -2) signal = 'CYCLICAL_LOW';
                        if (zscore > 2) signal = 'EXTENDED';

                        // Assuming CURRENT_DATE logic. In real system, we might calculate for specific historical dates.
                        // For now, we use today's date or the latest date we have data for?
                        // User script used CURRENT_DATE in SQL.

                        await db.query(
                            `INSERT INTO sectors_zscore (symbol, date, benchmark, window, zscore, signal) 
               VALUES ($1, CURRENT_DATE, $2, $3, $4, $5)
               ON CONFLICT (symbol, date, benchmark, window) 
               DO UPDATE SET zscore = EXCLUDED.zscore, signal = EXCLUDED.signal`,
                            [sector, benchmark, window, zscore, signal]
                        );
                        console.log(`Updated Z-Score for ${sector}/${benchmark} (${window}d): ${zscore}`);
                    }
                } catch (err) {
                    console.error(`Error calculating z-score for ${sector} vs ${benchmark} window ${window}`, err);
                }
            }
        }
    }
}

async function calculateZScore(sector: string, benchmark: string, window: number): Promise<number | null> {
    const windowPlusOne = window + 1;
    // Fetch returns for sector and benchmark over the window period
    const sectorData = await db.query(
        `SELECT close_price, LAG(close_price) OVER (ORDER BY date) as prev_price
     FROM sectors_daily 
     WHERE symbol = $1 
     ORDER BY date DESC 
     LIMIT $2`,
        [sector, windowPlusOne]
    );

    const benchmarkData = await db.query(
        `SELECT close_price, LAG(close_price) OVER (ORDER BY date) as prev_price
     FROM sectors_daily 
     WHERE symbol = $1 
     ORDER BY date DESC 
     LIMIT $2`,
        [benchmark, windowPlusOne]
    );

    if (sectorData.rows.length < window || benchmarkData.rows.length < window) {
        return null; // Not enough data
    }

    // Calculate daily returns
    // Note: rows[0] is most recent. row[last] is oldest.
    // We need aligned dates ideally, but assuming matching trading days for simplicity per spec logic

    const sectorReturns = sectorData.rows
        .filter(r => r.prev_price)
        .map(r => (Number(r.close_price) - Number(r.prev_price)) / Number(r.prev_price));

    const benchmarkReturns = benchmarkData.rows
        .filter(r => r.prev_price)
        .map(r => (Number(r.close_price) - Number(r.prev_price)) / Number(r.prev_price));

    // Truncate to match length if slightly off (though they should match if limited by N and ordered)
    const len = Math.min(sectorReturns.length, benchmarkReturns.length);

    // Calculate excess returns (sector - benchmark)
    const excessReturns = [];
    for (let i = 0; i < len; i++) {
        excessReturns.push(sectorReturns[i] - benchmarkReturns[i]);
    }

    // Calculate mean and std of excess returns
    const mean = excessReturns.reduce((a, b) => a + b, 0) / excessReturns.length;
    const variance = excessReturns.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / excessReturns.length;
    const std = Math.sqrt(variance);

    if (std === 0) return 0;

    // Z-score = (current excess return - mean) / std
    // excessReturns[0] is the most recent because we ordered DESC.
    const currentExcess = excessReturns[0];
    const zscore = (currentExcess - mean) / std;

    return Math.round(zscore * 100) / 100; // Round to 2 decimals
}
