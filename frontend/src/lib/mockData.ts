// Mock data for GitHub Pages static deployment
// This replaces the backend API with static data

export const mockSectorZScores = {
    data: [
        { symbol: 'XLU', date: '2024-01-10', zscore: -2.15, signal: 'CYCLICAL_LOW' },
        { symbol: 'XLP', date: '2024-01-10', zscore: -1.82, signal: 'UNDERVALUED' },
        { symbol: 'XLV', date: '2024-01-10', zscore: -0.95, signal: 'NEUTRAL' },
        { symbol: 'XLRE', date: '2024-01-10', zscore: -0.45, signal: 'NEUTRAL' },
        { symbol: 'XLF', date: '2024-01-10', zscore: 0.12, signal: 'NEUTRAL' },
        { symbol: 'XLI', date: '2024-01-10', zscore: 0.78, signal: 'NEUTRAL' },
        { symbol: 'XLB', date: '2024-01-10', zscore: 1.25, signal: 'ELEVATED' },
        { symbol: 'XLE', date: '2024-01-10', zscore: 1.89, signal: 'ELEVATED' },
        { symbol: 'XLK', date: '2024-01-10', zscore: 2.45, signal: 'EXTENDED' },
        { symbol: 'XLY', date: '2024-01-10', zscore: 2.78, signal: 'EXTENDED' },
        { symbol: 'XLC', date: '2024-01-10', zscore: 3.12, signal: 'EXTENDED' },
    ]
};

export const mockSectorTimeseries = {
    data: {
        XLU: [
            { date: '2023-07-01', zscore: -0.5 },
            { date: '2023-08-01', zscore: -0.8 },
            { date: '2023-09-01', zscore: -1.2 },
            { date: '2023-10-01', zscore: -1.5 },
            { date: '2023-11-01', zscore: -1.8 },
            { date: '2023-12-01', zscore: -2.0 },
            { date: '2024-01-10', zscore: -2.15 },
        ],
        XLK: [
            { date: '2023-07-01', zscore: 1.2 },
            { date: '2023-08-01', zscore: 1.5 },
            { date: '2023-09-01', zscore: 1.8 },
            { date: '2023-10-01', zscore: 2.0 },
            { date: '2023-11-01', zscore: 2.2 },
            { date: '2023-12-01', zscore: 2.35 },
            { date: '2024-01-10', zscore: 2.45 },
        ],
        XLC: [
            { date: '2023-07-01', zscore: 1.5 },
            { date: '2023-08-01', zscore: 1.9 },
            { date: '2023-09-01', zscore: 2.2 },
            { date: '2023-10-01', zscore: 2.5 },
            { date: '2023-11-01', zscore: 2.8 },
            { date: '2023-12-01', zscore: 3.0 },
            { date: '2024-01-10', zscore: 3.12 },
        ],
        XLP: [
            { date: '2023-07-01', zscore: 0.2 },
            { date: '2023-08-01', zscore: -0.3 },
            { date: '2023-09-01', zscore: -0.8 },
            { date: '2023-10-01', zscore: -1.2 },
            { date: '2023-11-01', zscore: -1.5 },
            { date: '2023-12-01', zscore: -1.7 },
            { date: '2024-01-10', zscore: -1.82 },
        ],
    }
};

export const mockMarginDebt = {
    current: {
        month: '2024-01',
        total_debt_billions: 787.2,
        yoy_growth_pct: 8.5,
        vs_2021_peak_pct: -18.9,
        signal: 'NEUTRAL'
    },
    timeseries: [
        { month: '2022-01', total_debt_billions: 832.5 },
        { month: '2022-04', total_debt_billions: 799.1 },
        { month: '2022-07', total_debt_billions: 725.6 },
        { month: '2022-10', total_debt_billions: 682.3 },
        { month: '2023-01', total_debt_billions: 695.8 },
        { month: '2023-04', total_debt_billions: 712.4 },
        { month: '2023-07', total_debt_billions: 745.2 },
        { month: '2023-10', total_debt_billions: 768.9 },
        { month: '2024-01', total_debt_billions: 787.2 },
    ]
};

export const mockAAII = {
    current: {
        survey_date: '2024-01-10',
        stocks_pct: 68.2,
        bonds_pct: 14.5,
        cash_pct: 17.3
    },
    timeseries: [
        { survey_date: '2023-07-01', stocks_pct: 62.5, bonds_pct: 16.2, cash_pct: 21.3 },
        { survey_date: '2023-08-01', stocks_pct: 64.1, bonds_pct: 15.8, cash_pct: 20.1 },
        { survey_date: '2023-09-01', stocks_pct: 63.8, bonds_pct: 15.5, cash_pct: 20.7 },
        { survey_date: '2023-10-01', stocks_pct: 60.2, bonds_pct: 16.8, cash_pct: 23.0 },
        { survey_date: '2023-11-01', stocks_pct: 65.5, bonds_pct: 14.9, cash_pct: 19.6 },
        { survey_date: '2023-12-01', stocks_pct: 67.8, bonds_pct: 14.2, cash_pct: 18.0 },
        { survey_date: '2024-01-10', stocks_pct: 68.2, bonds_pct: 14.5, cash_pct: 17.3 },
    ],
    historical: {
        avg_stocks: 61.2,
        avg_bonds: 15.9,
        avg_cash: 22.0
    }
};
