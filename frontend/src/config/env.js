/**
 * Application Runtime & Environment Configuration
 */
export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  ANALYTICS_URL: import.meta.env.VITE_ANALYTICS_URL || 'http://127.0.0.1:8000',
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  APP_NAME: 'foliolysis',
  APP_TAGLINE: 'Algorithmic Trading & Quantitative Portfolio Risk Simulator',
};

export default ENV;
