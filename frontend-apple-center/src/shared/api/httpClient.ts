export interface HttpResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

export class HttpError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "HttpError";
  }
}

/**
 * Standardized HTTP client for browser and SSR requests.
 */
export async function httpClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<HttpResponse<T>> {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  let responseData: unknown = null;
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }
  } else {
    responseData = await response.text();
  }

  if (!response.ok) {
    throw new HttpError(
      response.statusText || `Request failed with status ${response.status}`,
      response.status,
      responseData
    );
  }

  return {
    data: responseData as T,
    status: response.status,
    ok: response.ok,
  };
}
