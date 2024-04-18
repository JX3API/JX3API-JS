import axios from "axios";
export class Request {
  /**
   * 创建一个新的 Request 实例。
   *
   * @param {Object} options - 请求的选项。
   * @param {string} options.token - jx3api的token。
   * @param {string} options.ticket - 推栏ticket。
   * @param {string} [url="https://api.jx3api.com"] - 请求的 URL。默认为 "https://api.jx3api.com"。
   */
  _axios = null;
  constructor(options, url = "https://api.jx3api.com") {
    if (!options.ticket) {
      console.log("未指定ticket，部分功能可能受限");
    }
    if (!options.token) {
      console.log("未指定ticket，将只可使用免费功能");
    }
    this._createAxios(options, url);
  }

  _createAxios(options, url) {
    console.log(url);
    //创建axios实例
    let _axios = axios.create({
      timeout: 6000, // 请求超时
      baseURL: url,
    });
    //设置拦截器，并在拦截器中统一添加token和ticket
    _axios.interceptors.request.use(function (apiconfig) {
      let infos = {
        token: options.token,
        ticket: options.ticket,
      };
      if (apiconfig.data) {
        apiconfig.data = { ...apiconfig.data, ...infos };
      } else {
        apiconfig.data = infos;
      }
      return apiconfig;
    });
    //设置响应拦截器
    _axios.interceptors.response.use(function (response) {
      const data = response.data;
      return data;
    });
    this._axios = _axios;
  }

  getAxios() {
    return this._axios;
  }
}
