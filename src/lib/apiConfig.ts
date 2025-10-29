// Centralized API Configuration with Fallback System

export const API_ENDPOINTS = {
  QURAN_BASE: 'https://quranapi.pages.dev/api',
  HADITH_BASE: 'https://hadithapi.pages.dev/api',
  HADITH_FALLBACK: 'https://random-hadith-generator.vercel.app',
  HADITH_KEYED: 'https://hadithapi.com/api/hadiths/?apiKey=$2y$10$rVMbTeEQF25yBJvUPV78sujtfiHwbnMk7iEq9W5tMZy32OV7nAG',
  DUA_BASE: 'https://dua-dhikr-two.vercel.app/api',
} as const;

interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Fetch with timeout support
 */
async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = 8000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Fetch with automatic fallback to secondary URLs
 */
export async function fetchWithFallback(
  primaryUrl: string,
  fallbackUrls: string[] = [],
  options: FetchOptions = {}
): Promise<any> {
  const urls = [primaryUrl, ...fallbackUrls];
  let lastError: Error | null = null;

  for (let i = 0; i < urls.length; i++) {
    try {
      console.log(`Attempting to fetch from: ${urls[i]}`);
      const response = await fetchWithTimeout(urls[i], options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache successful response in localStorage
      if (i === 0) {
        // Only cache primary endpoint responses
        try {
          const cacheKey = `api_cache_${btoa(primaryUrl).substring(0, 50)}`;
          localStorage.setItem(cacheKey, JSON.stringify({
            data,
            timestamp: Date.now(),
          }));
        } catch (e) {
          console.warn('Failed to cache response:', e);
        }
      }

      return data;
    } catch (error) {
      console.warn(`Failed to fetch from ${urls[i]}:`, error);
      lastError = error as Error;
      
      // Try fallback on last URL failure - check localStorage
      if (i === urls.length - 1) {
        try {
          const cacheKey = `api_cache_${btoa(primaryUrl).substring(0, 50)}`;
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            // Use cache if less than 24 hours old
            if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
              console.log('Using cached data from localStorage');
              return data;
            }
          }
        } catch (e) {
          console.warn('Failed to retrieve cached data:', e);
        }
      }
    }
  }

  throw lastError || new Error('All API endpoints failed');
}

/**
 * Get cached data if available and fresh
 */
export function getCachedData(url: string, maxAgeMs: number = 24 * 60 * 60 * 1000): any | null {
  try {
    const cacheKey = `api_cache_${btoa(url).substring(0, 50)}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < maxAgeMs) {
        return data;
      }
    }
  } catch (e) {
    console.warn('Failed to get cached data:', e);
  }
  return null;
}

/**
 * Clear all API caches
 */
export function clearApiCache(): void {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('api_cache_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (e) {
    console.warn('Failed to clear cache:', e);
  }
}
