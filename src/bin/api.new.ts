import { Request } from "../utils/request";
import { RequestOptions, RequestHttp } from "../utils/request copy";
/**
 * 创建一个新的 api 实例。
 *
 * @param {Object} options - 请求的选项。
 * @param {string} options.token - jx3api的token。
 * @param {string} options.ticket - 推栏ticket。
 * @param {string} [url="https://www.jx3api.com"] - 请求的 URL。默认为 "https://www.jx3api.com"。
 */
export class api {
  private requestHttp: RequestHttp;
  static instance: api;
  constructor(options: RequestOptions) {
    this.requestHttp = new RequestHttp(options);
  }
  //单例实现
  create(options: RequestOptions) {
    if (!api.instance) {
      api.instance = new api(options);
    }
    return api.instance;
  }
}
