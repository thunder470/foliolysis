/**
 * foliolysis Enterprise API Client
 * Features:
 * - Credentials included by default for secure HttpOnly cookie authentication
 * - In-memory cache with stale-while-revalidate mechanics for idempotent GET queries
 * - Automatic retry with exponential backoff on transient network faults
 * - Unified error handling and response normalization
 */

const BACKEND_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
   * Cached GET query with stale-while-revalidate
   */
  async get(endpoint, { staleTime = DEFAULT_STALE_MS, bypassCache = false } = {}) {
    const url = `${BACKEND_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const now = Date.now();
    const cached = queryCache.get(url);

    if (!bypassCache && cached && now - cached.timestamp < staleTime) {
      return cached.data;
    }

    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    };

    const promise = fetchWithRetry(url, options)
      .then((data) => {
        queryCache.set(url, { data, timestamp: Date.now() });
        return data;
      })
      .catch((err) => {
        // Return stale data if available on network error
        if (cached?.data) {
          console.warn(`[API Client] Network error fetching ${endpoint}. Serving stale cached data.`);
          return cached.data;
        }
        throw err;
      });

    return promise;
  },

  /**
   * POST request with JSON payload & secure credentials
   */
  async post(endpoint, body = {}) {
    const url = `${BACKEND_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    };
    return fetchWithRetry(url, options, 0); // Do not auto-retry non-idempotent POSTs
  },

  /**
   * DELETE request
   */
  async delete(endpoint) {
    const url = `${BACKEND_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const options = {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    };
    return fetchWithRetry(url, options, 0);
  },

  /**
   * Invalidate query cache by endpoint pattern
   */
  invalidateCache(pattern = '') {
    if (!pattern) {
      queryCache.clear();
      return;
    }
    for (const key of queryCache.keys()) {
      if (key.includes(pattern)) {
        queryCache.delete(key);
      }
    }
  },
};
