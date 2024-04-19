import WebSocket from "ws";
/**
 * 创建一个 reConnectWebSocket 实例。
 * @param {string} url WebSocket 服务器的 URL。
 * @param {object} options WebSocket 配置
 * @param {number} [heartbeatInterval=5000] 发送心跳消息的间隔（毫秒）。
 * @param {number} [reconnectInterval=10000] 重新连接尝试的间隔（毫秒）。
 */
export class reConnectWebSocket {
  url = null;
  options = null;
  heartbeatInterval = 5000;
  reconnectInterval = 10000;
  ws = null;
  heartbeatTimer = null;
  reconnectTimer = null;
  isReconnecting = false;
  connectionAttempts = 0;
  messageCallBack = [];
  constructor(url, options = undefined, heartbeatInterval = 5000, reconnectInterval = 10000) {
    this.url = url;
    this.options = options; //连接参数
    this.heartbeatInterval = heartbeatInterval; //心跳间隔
    this.reconnectInterval = reconnectInterval; //重新连接间隔
    this.ws = null; //ws实例
    this.heartbeatTimer = null; //心跳定时器
    this.reconnectTimer = null; //重新连接定时器
    this.isReconnecting = false; //是否正在重新连接
    this.connectionAttempts = 0; //连接尝试次数
  }

  /**
   * 连接到 WebSocket 服务器。
   */
  connect() {
    this.ws = new WebSocket(this.url, this.options);
    this.ws.on("open", () => {
      console.log("WebSocket 已连接");
      this.startHeartbeat();
      this.connectionAttempts = 0; // 在成功连接时重置连接尝试次数
    });

    this.ws.on("message", (data) => {
      const msg = JSON.parse(data);
      console.log("收到消息:", msg);
      this.messageCallBack.forEach((cb) => {
        cb(msg);
      });
    });

    this.ws.on("error", (error) => {
      console.error("WebSocket 错误:", error);
      this.reconnect();
    });

    this.ws.on("close", () => {
      console.log("WebSocket 已关闭");
      this.stopHeartbeat();
      this.reconnect();
    });
  }

  /**
   * 尝试重新连接到 WebSocket 服务器。
   */
  reconnect() {
    if (!this.isReconnecting) {
      this.isReconnecting = true;
      const delay = Math.min(
        this.reconnectInterval * Math.pow(2, this.connectionAttempts),
        60000 // 将重新连接尝试间隔上限设置为 1 分钟
      );
      console.log(`将在 ${delay / 1000} 秒后尝试重新连接...`);
      this.reconnectTimer = setTimeout(() => {
        this.connect();
        this.isReconnecting = false;
        this.connectionAttempts++;
      }, delay);
    }
  }

  /**
   * 开始发送心跳消息。
   */
  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        // console.log("发送心跳");
        this.ws.ping();
      } else {
        this.reconnect(); // 如果 WebSocket 不处于打开状态，则重新连接
      }
    }, this.heartbeatInterval);

    this.ws.on("pong", () => {
      // console.log("收到心跳响应");
    });

    this.ws.ping(); // 发送初始 ping
  }

  /**
   * 停止发送心跳消息。
   */
  stopHeartbeat() {
    clearInterval(this.heartbeatTimer);
  }

  /**
   * 发送消息到 WebSocket 服务器。
   * @param {string} message 要发送的消息。
   */
  send(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.error("WebSocket 未打开，无法发送消息。");
    }
  }

  /**
   * 关闭 WebSocket 连接。
   */
  close() {
    clearTimeout(this.reconnectTimer);
    this.stopHeartbeat();
    this.ws.close();
  }
  message(callback) {
    if (typeof callback !== "function") {
      throw new Error("message回调必须是函数");
    }
    this.messageCallBack.push(callback);
  }
}
