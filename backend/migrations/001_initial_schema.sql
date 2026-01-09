-- Core tables
CREATE TABLE IF NOT EXISTS sectors_daily (
  symbol VARCHAR(10),
  date DATE,
  close_price DECIMAL(10,2),
  volume BIGINT,
  PRIMARY KEY (symbol, date)
);

CREATE TABLE IF NOT EXISTS sectors_zscore (
  symbol VARCHAR(10),
  date DATE,
  benchmark VARCHAR(10),
  window INT,
  zscore DECIMAL(6,3),
  signal VARCHAR(20),
  PRIMARY KEY (symbol, date, benchmark, window)
);

CREATE TABLE IF NOT EXISTS margin_debt (
  month DATE PRIMARY KEY,
  total_debt_billions DECIMAL(10,2),
  yoy_growth_pct DECIMAL(6,2),
  vs_2021_peak_pct DECIMAL(6,2),
  signal VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS aaii_allocation (
  survey_date DATE PRIMARY KEY,
  stocks_pct DECIMAL(5,2),
  bonds_pct DECIMAL(5,2),
  cash_pct DECIMAL(5,2)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sectors_date ON sectors_daily(date DESC);
CREATE INDEX IF NOT EXISTS idx_zscore_date ON sectors_zscore(date DESC);
