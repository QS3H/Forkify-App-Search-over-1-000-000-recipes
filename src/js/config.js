// Environment-based configuration
const getApiKey = () => {
  // In production, this should come from environment variables
  // For development, we'll use a fallback
  return process.env.FORKIFY_API_KEY || '827cd979-2ddc-49f4-8aec-b5616648fca5';
};

export const API_URL = 'https://forkify-api.jonas.io/api/v2/recipes/';
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 10;
export const KEY = getApiKey();
export const MODAL_CLOSE_SEC = 2.5;

// Additional configuration
export const DEBOUNCE_DELAY = 500; // ms for search debouncing
export const MAX_RECIPES_PER_PAGE = 50;
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in ms
