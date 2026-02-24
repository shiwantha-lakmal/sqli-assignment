export class BaseClient {
  protected headers!: Record<string, string>;
  protected baseURL: string;

  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
  }

  protected async get(endpoint: string, params?: Record<string, string>): Promise<Response> {
    const url = this.normalizeEndpoint(endpoint);
    const queryString = params ? `?${this.buildQueryString(params)}` : '';
    const fullUrl = `${this.baseURL}${url}${queryString}`;
    console.log(`GET  ${fullUrl}`);
    return await fetch(fullUrl, {
      method: 'GET',
      headers: this.headers,
    });
  }

  protected async post(endpoint: string, data: Record<string, any>): Promise<Response> {
    const url = this.normalizeEndpoint(endpoint);
    const fullUrl = `${this.baseURL}${url}`;
    console.log(`POST ${fullUrl}`);
    return await fetch(fullUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  protected async handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return await response.json() as T;
    }
    throw new Error(`API Error ${response.status}: ${response.statusText}`);
  }

  protected normalizeEndpoint(endpoint: string): string {
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  }

  protected buildQueryString(params: Record<string, string>): string {
    return Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }
}
