import WebSocket from "ws";

export class reConnectWebSocket {
  url = null;
  options = null;
  heartbeatInterval = 5000; // 心跳间隔，默认为5秒
  reconnectInterval = 10000; // 重新连接间隔，默认为10秒
  ws = null;
  heartbeatTimer = null;
  reconnectTimer = null;
  isReconnecting = false; // 是否正在重新连接
  connectionAttempts = 0; // 连接尝试次数
  messageCallBack = []; // 消息回调函数数组

  constructor(url, options = undefined, heartbeatInterval = 5000, reconnectInterval = 10000) {
    this.url = url;
    this.options = options;
    this.heartbeatInterval = heartbeatInterval;
    this.reconnectInterval = reconnectInterval;
  }

  // 连接 WebSocket
  connect() {
    this.ws = new WebSocket(this.url, this.options);
    this.ws.on("open", () => {
      console.log("WebSocket 已连接");
      this.startHeartbeat();
      this.connectionAttempts = 0;
    });

    this.ws.on("message", (data) => {
      const msg = JSON.parse(data);
      this.messageCallBack.forEach((cb) => {
        cb(msg);
      });
    });

    this.ws.on("error", (error) => {
      console.error("WebSocket 错误:", error);
      this.reconnect();
    });

    this.ws.on("close", () => {
      console.log("WebSocket 连接关闭");
      this.stopHeartbeat();
      this.reconnect();
    });
  }

  // 重新连接 WebSocket
  reconnect() {
    if (!this.isReconnecting) {
      this.isReconnecting = true;
      const delay = Math.min(this.reconnectInterval * Math.pow(2, this.connectionAttempts), 60000);
      console.log(`将在 ${delay / 1000} 秒后重新连接...`);
      this.reconnectTimer = setTimeout(() => {
        this.connect();
        this.isReconnecting = false;
        this.connectionAttempts++;
      }, delay);
    }
  }

  // 开始心跳检测
  startHeartbeat() {
    let consecutivePingFailures = 0;

    const sendPing = () => {
      if (consecutivePingFailures >= 3) {
        console.log(`心跳失败次数：${consecutivePingFailures} 重新连接`);
        this.reconnect();
        return;
      }
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.ping();
        // console.log(`发送ping 失败次数：${consecutivePingFailures}`);
        consecutivePingFailures++;
      } else {
        this.reconnect();
      }
    };

    this.heartbeatTimer = setInterval(sendPing, this.heartbeatInterval);

    this.ws.on("pong", () => {
      // console.log("收到pong");
      consecutivePingFailures = 0;
    });

    sendPing(); // 发送初始 ping
  }

  // 停止心跳检测
  stopHeartbeat() {
    clearInterval(this.heartbeatTimer);
  }

  // 发送消息
  send(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.error("WebSocket 未打开，无法发送消息。");
    }
  }

  // 关闭连接
  close() {
    clearTimeout(this.reconnectTimer);
    this.stopHeartbeat();
    this.ws.close();
  }

  // 添加消息回调函数
  message(callback) {
    if (typeof callback !== "function") {
      throw new Error("消息回调必须是一个函数");
    }
    this.messageCallBack.push(callback);
  }
}
