const fallbackUrl = 'http://localhost:4000';

export const API_URL = import.meta.env.VITE_API_URL || fallbackUrl;

let authToken: string | null = null;

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

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.error || 'Request failed';
    throw new Error(message);
  }

  return data as T;
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
