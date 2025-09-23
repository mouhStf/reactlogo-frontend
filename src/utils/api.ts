export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export async function apiFetch<T> (
  path: string,
  { 
    headers,
    json,
    body,
    method
  }: {
    headers?: Record<string, string>;
    json?: Record<string, unknown>;
    body?: BodyInit;
    method?: string;
  } = {}
) : Promise<T> {
  method ??= json ? 'POST' : 'GET';

  let finalBody: BodyInit | undefined = body;
  const finalHeaders: Record<string, string> = {
    ...headers,
    accept: 'application/json',
  }

  if (json) {
    finalHeaders['Content-Type'] = 'application/json';
    finalBody = JSON.stringify(json);
  } else if (body instanceof FormData) {
  } else if (body && !finalHeaders['Content-Type']) {
    finalHeaders['Content-Type'] = 'application/octet-stream';
  }

  const r = await fetch( API_BASE_URL + path, {
    method,
    body: finalBody,
    headers: finalHeaders,
  });

  if (r.ok) {
    return r.json() as Promise<T>;
  }

  throw new ApiError(r.status, await r.json());
}

class ApiError extends Error {
  constructor(public status: number, public data: Record<string, unknown>) {
    if (status === 401) {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        window.location.reload();
      }
    }
    super();
  }
}
