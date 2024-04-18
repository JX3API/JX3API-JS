# jx3api-py

The JavaScript SDK to the [JX3API](https://www.jx3api.com).

## Installation

### From pypi

```bash
yarn add jx3api
```

## Quick Start

### Sync

```javascript
import jx3api from "jx3api"

const api = new jx3api({token="XXX", ticket="XXX"})

api.active_calendar("梦江南").then(res=>{
    console.log(res)
})
```

:)

## License

[MIT](LICENSE)
