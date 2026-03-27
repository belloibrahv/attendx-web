const fallbackUrl = 'https://attendx-apis.onrender.com';
const proxyUrl = '/api';

// Force proxy usage on Vercel domains - more comprehensive detection
const isVercel = typeof window !== 'undefined' && 
  (window.location.hostname.includes('vercel.app') || 
   window.location.hostname.includes('vercel.com') ||
   window.location.hostname === 'attendx-web.vercel.app' ||
   window.location.hostname.endsWith('.vercel.app'));

// Always use proxy on Vercel, fallback to environment variable or direct URL
export const API_URL = isVercel ? proxyUrl : (import.meta.env.VITE_API_URL || fallbackUrl);

console.log('API Configuration:', {
  isVercel,
  hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
  API_URL,
  env: import.meta.env.VITE_API_URL,
  forced: isVercel ? 'Using proxy' : 'Using direct API'
});

let authToken: string | null = null;

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export function setAuthToken(token: string | null) {
  authToken = token;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers ? (options.headers as Record<string, string>) : {}),
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const fullUrl = `${API_URL}${path}`;
  console.log('Making request to:', fullUrl);
  console.log('API_URL:', API_URL);
  console.log('Current hostname:', typeof window !== 'undefined' ? window.location.hostname : 'server');
  
  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    const text = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', text.substring(0, 200));
    
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error('JSON parse error:', error);
        console.error('Response text that failed to parse:', text);
        throw new Error(`JSON.parse: unexpected character at line 1 column 1 of the JSON data`);
      }
    }

    if (!response.ok) {
      const message = data?.error || 'Request failed';
      throw new Error(message);
    }

    return data as T;
  } catch (error) {
    console.error('Fetch error:', error);
    const errorMessage = getErrorMessage(error);
    
    // Handle CORS errors specifically
    if (errorMessage.includes('CORS') || errorMessage.includes('NetworkError') || errorMessage.includes('fetch')) {
      throw new Error(`Network Error: Unable to connect to API server. ${
        window.location.hostname === 'localhost' 
          ? 'Try accessing https://attendx-web.vercel.app/admin instead of localhost.'
          : 'Please check your internet connection.'
      }`);
    }
    
    throw error instanceof Error ? error : new Error(errorMessage);
  }
}

async function requestBlob(path: string, options: RequestInit = {}): Promise<Blob> {
  const headers: Record<string, string> = {
    ...(options.headers ? (options.headers as Record<string, string>) : {}),
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    let message = 'Request failed';
    try {
      const data = JSON.parse(text);
      message = data?.error || message;
    } catch (_) {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return response.blob();
}

export const api = {
  login: (payload: { role: 'lecturer' | 'kiosk' | 'student'; identifier: string; password: string }) =>
    request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  register: (payload: { role: 'lecturer' | 'student'; identifier: string; password: string; name?: string }) =>
    request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getSessions: () => request<any[]>('/sessions'),

  getActiveSession: () => request<any>('/sessions/active'),

  getQrToken: (id: string) =>
    request<{ token: string; expiresAt: number }>(`/sessions/${id}/token`, {
      method: 'POST',
    }),

  startSession: (payload: any) =>
    request<any>('/sessions/start', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  endSession: (id: string) =>
    request<any>(`/sessions/${id}/end`, {
      method: 'POST',
    }),

  getAttendanceBySession: (id: string) =>
    request<any[]>(`/attendance/session/${id}`),

  getSummary: (id: string) => request<any>(`/reports/summary?sessionId=${id}`),

  getAttendanceReport: (query: string) => request<any[]>(`/reports/attendance${query}`),

  exportAttendance: (query: string) =>
    requestBlob(`/reports/export${query}`, {
      method: 'GET',
    }),
};
