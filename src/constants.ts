const env = process.env.NODE_ENV;

const WINDOW_CONSTANTS = {
  childXOffset: 0,
  childHeight: 400,
  childWidth: 1024,
  awsYOffset: 600,
  ghYOffset: 100,
  mainHeight: 1024,
  mainWidth: 1024,
  mainXOffset: 0,
  mainYOffset: 0,
};

const base =
  env === 'development'
    ? 'http://localhost:3000'
    : 'https://tpg-dev-portal-server.fly.dev';

const URL_CONSTANTS = {
  base,
  owner: 'nookworth',
  repo: 'tpg-dev-portal',
  review: 'review-message',
};

export { URL_CONSTANTS, WINDOW_CONSTANTS };
