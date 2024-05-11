import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

// 定义请求选项类型
export type RequestOptions = {
  token: string; // JX3API站点token
  ticket: string; // 推栏ticket
  url?: string; // 请求地址
};

export class RequestHttp {
  private service: AxiosInstance;

  constructor(options: RequestOptions) {
    // 创建 Axios 实例
    this.service = axios.create({
      timeout: 6000,
      baseURL: options.url || "https://api.jx3api.com",
    });

    // 请求拦截器
    this.service.interceptors.request.use((config) => {
      // 在请求中添加 token 和 ticket
      config.data = {
        ...config.data,
        token: options.token,
        ticket: options.ticket,
      };
      return config;
    });

    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  // 发送 GET 请求
  async get<T>(url: string, params?: object): Promise<T> {
    try {
      const response = await this.service.get<T>(url, { params });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 发送 POST 请求
  async post<T>(url: string, data?: object): Promise<T> {
    try {
      const response = await this.service.post<T>(url, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
