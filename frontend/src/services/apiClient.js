/**
 * foliolysis Enterprise API Client
 * Features:
 * - Credentials included by default for secure HttpOnly cookie authentication
 * - In-memory cache with stale-while-revalidate mechanics for idempotent GET queries
 * - Automatic retry with exponential backoff on transient network faults
 * - Unified error handling and response normalization
 */

import { ENV } from '@/config/env';

const BACKEND_BASE_URL = ENV.API_URL;

// In-memory query cache map: key -> { data, timestamp, promise }
const queryCache = new Map();
const DEFAULT_STALE_MS = 15000; // 15 seconds fresh window

export class ApiError extends Error {
  constructor(message, status, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function fetchWithRetry(url, options, retries = 2, delayMs = 600) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: response.statusText };
      }
      // Retry only on 5xx server errors for idempotent requests (GET)
      if (response.status >= 500 && retries > 0 && (!options.method || options.method === 'GET')) {
        await new Promise((r) => setTimeout(r, delayMs));
        return fetchWithRetry(url, options, retries - 1, delayMs * 2);
      }
      throw new ApiError(
        errorData.error || errorData.message || `Request failed with status ${response.status}`,
        response.status,
        errorData.details
      );
    }
    return await response.json();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (retries > 0 && (!options.method || options.method === 'GET')) {
      await new Promise((r) => setTimeout(r, delayMs));
      return fetchWithRetry(url, options, retries - 1, delayMs * 2);
    }
    throw new ApiError(err.message || 'Network connection failed', 0);
  }
}

export const api = {
  baseUrl: BACKEND_BASE_URL,

  /**
   * Cached, resilient GET query with stale-while-revalidate support
   */
  async get(path, options = {}) {
    const fullUrl = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    const cacheKey = fullUrl;
    const now = Date.now();
    const staleTime = options.staleTime ?? DEFAULT_STALE_MS;

    const cached = queryCache.get(cacheKey);

    // Return fresh cached data immediately
    if (cached && !options.skipCache && now - cached.timestamp < staleTime) {
      return cached.data;
    }

    // Reuse in-flight promise to avoid duplicate parallel requests
    if (cached?.promise) {
      return cached.promise;
    }

    const fetchPromise = (async () => {
      try {
        const data = await fetchWithRetry(
          fullUrl,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              ...options.headers,
            },
          },
          options.retries ?? 2
        );

        queryCache.set(cacheKey, {
          data,
          timestamp: Date.now(),
          promise: null,
        });

        return data;
      } catch (err) {
        // Return stale data as fallback if available during network degradation
        if (cached?.data) {
          console.warn(`[API Client SWR Fallback] Serving stale data for ${path}: ${err.message}`);
          return cached.data;
        }
        throw err;
      } finally {
        const existing = queryCache.get(cacheKey);
        if (existing) existing.promise = null;
      }
    })();

    if (cached) {
      cached.promise = fetchPromise;
    } else {
      queryCache.set(cacheKey, { data: null, timestamp: 0, promise: fetchPromise });
    }

    return fetchPromise;
  },

  /**
   * Mutative POST request - automatically invalidates cache prefixes if specified
   */
  async post(path, body, options = {}) {
    const fullUrl = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    const result = await fetchWithRetry(
      fullUrl,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(body),
      },
      options.retries ?? 1
    );

    // Clear cache entries matching any invalidateTags
    if (options.invalidateTags) {
      options.invalidateTags.forEach((tag) => {
        for (const key of queryCache.keys()) {
          if (key.includes(tag)) queryCache.delete(key);
        }
      });
    }

    return result;
  },

  /**
   * Clears entire or selective in-memory query cache
   */
  clearCache(pattern = null) {
    if (!pattern) {
      queryCache.clear();
      return;
    }
    for (const key of queryCache.keys()) {
      if (key.includes(pattern)) queryCache.delete(key);
    }
  },
};

export default api;
