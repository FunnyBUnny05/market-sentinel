import cron from 'node-cron';
import { fetchSectorPrices } from './fetchSectorPrices';
import { fetchAAII } from './fetchAAII';
import { checkForNewMarginDebt } from './fetchMarginDebt';

export function startScheduler() {
    console.log('Initializing Cron Scheduler...');

    // Daily 6am ET (11am UTC approx, depends on server time. Assuming UTC environment or configured TZ)
    // To be safe, we can use TZ string if node-cron supports it, or just assume system time.
    // User said "Daily 6am ET". 

    cron.schedule('0 11 * * *', () => {
        console.log('Running Daily Sector Fetch');
        fetchSectorPrices().catch(console.error);
    }, {
        timezone: "America/New_York"
    });

    // Weekly Sunday 6pm ET
    cron.schedule('0 18 * * 0', () => {
        console.log('Running Weekly AAII Fetch');
        fetchAAII().catch(console.error);
    }, {
        timezone: "America/New_York"
    });

    // Daily 8am ET (check for new margin debt)
    cron.schedule('0 13 * * *', () => { // 1pm UTC = 8am ET approx? No, 8am ET is 13:00 UTC.
        console.log('checking for new margin debt');
        checkForNewMarginDebt().catch(console.error);
    }, {
        timezone: "America/New_York"
    });

    console.log('Scheduler started.');
}
