import { reConnectWebSocket } from "../utils/reConnectWebSocket.js";

export class ws {
  url = "wss://socket.jx3api.com";
  token = null;
  events = new Map();

  constructor(options) {
    this.token = options.token || null;
    this._initWebSocket();
  }

  _initWebSocket() {
    this.ws = new reConnectWebSocket(this.url, {
      headers: {
        token: this.token,
      },
    });
    this.ws.connect();
    this.ws.message(this.dispatch.bind(this)); // 绑定 dispatch 方法的上下文为当前对象
  }

  dispatch(message) {
    const messageType = message.action;
    if (this.events.has(String(messageType))) {
      this.events.get(String(messageType)).forEach((callback) => {
        callback(message);
      });
    }
  }
  /**
   * 注册事件处理函数。
   * 1001 奇遇报时
   * 1002 抓马刷新
   * 1003 抓马捕获
   * 1004 扶摇开启
   * 1005 扶摇结束
   * 1006 烟花报时（已关闭）
   * 1007 玄晶报时
   * 1008 追魂点名
   * 1009 诛恶事件
   * 1010 的卢刷新
   * 1011 的卢捕获
   * 1012 的卢竞拍
   * 1101 粮仓被劫
   * 1102 大将重置
   * 1103 大旗被夺
   * 1104 据点占领(有帮会)
   * 1105 据点占据(无帮会)
   * 1106 结算贡献
   * 1107 战功结算
   * 1108 宣战开始
   * 1109 宣战结束
   * 1110 战场统计
   * 1111 战场结束
   * 2001 开服监控
   * 2002 新闻资讯
   * 2003 游戏更新
   * 2004 八卦速报
   * 2005 关隘预告
   * 2006 云从预告
   * @param {number|string} eventType 事件类型。
   * @param {Function} callback 事件类型。
   */
  on(eventType, callback) {
    if (typeof callback !== "function") {
      throw new Error("事件处理程序必须是函数");
    }

    const eventTypeString = String(eventType);
    if (this.events.has(eventTypeString)) {
      this.events.get(eventTypeString).push(callback);
    } else {
      this.events.set(eventTypeString, [callback]);
    }
  }
}
