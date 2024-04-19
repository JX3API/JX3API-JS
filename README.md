# jx3api-js

The JavaScript SDK to the [JX3API](https://www.jx3api.com).

## Installation

### From yarn

```bash
yarn add jx3api
```

### From npm

```bash
npm install jx3api
```

## Quick Start

```javascript
import jx3api from "jx3api"

//API接口
const api = new jx3api.api({token="XXX", ticket="XXX"})
api.active_calendar("梦江南").then(res=>{
    console.log(res)
})
//WS推送消息
const ws = new jx3api.ws({token="XXX"})
ws.on('10001',(msg)=>{
    console.log(msg)
})
```

:)

## License

[MIT](LICENSE)
