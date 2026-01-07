export interface RequestConfig extends RequestInit {
  timeout?: number;
}

export class HttpClient {
  private baseURL: string;
  private defaultConfig: RequestConfig;

  constructor(baseURL: string = '', config: RequestConfig = {}) {
    this.baseURL = baseURL;
    this.defaultConfig = config;
  }

  private async request<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    const { timeout, ...fetchConfig } = { ...this.defaultConfig, ...config };
    const fullURL = this.baseURL + url;

    const controller = new AbortController();
    const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null;

    try {
      const response = await fetch(fullURL, {
        ...fetchConfig,
        signal: controller.signal,
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });
  }

  async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });
  }

  async delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }
}
