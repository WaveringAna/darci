const FLOAT_DECIMAL_PRECISION = 2;
const DESTINY_API_KEY = process.env.REACT_APP_DESTINY_API_KEY;
const DATA_REFRESH_INTERVAL = 30 * 1000; //Every 30 seconds
const MANIFEST_CHECK_INTERVAL = 60 * 1000 * 60; //60 minutes

const PLAYER_VIEW_REFRESH_INTERVAL = 30 * 1000;

export {
  FLOAT_DECIMAL_PRECISION,
  DESTINY_API_KEY,
  DATA_REFRESH_INTERVAL,
  MANIFEST_CHECK_INTERVAL,
  PLAYER_VIEW_REFRESH_INTERVAL,
};
