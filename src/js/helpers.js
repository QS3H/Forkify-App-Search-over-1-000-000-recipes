import { TIMEOUT_SEC, CACHE_DURATION } from './config.js';

// Cache for API responses
const cache = new Map();

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Debounce utility
export const debounce = function (func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Cache utility
const getCachedData = function (key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = function (key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  // Check cache for GET requests
  if (!uploadData) {
    const cachedData = getCachedData(url);
    if (cachedData) return cachedData;
  }

  const fetchPro = uploadData
    ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      })
    : fetch(url);

  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);

  // Cache successful GET responses
  if (!uploadData) {
    setCachedData(url, data);
  }

  return data;
};

// Clear cache utility
export const clearCache = function () {
  cache.clear();
};
