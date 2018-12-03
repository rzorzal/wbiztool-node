# wbiztool-node
Just a proxy for the API (https://wbiztool.com/docs/)

## Exemple

```javascript
let Wbiz = require('wbiztool-node');


const wbizInstance = new Wbiz({
    client_id: "YOUR CLIENTE_ID",
    api_key: "YOUR API_KEY"
});

wbizInstance.sendMessage({
    whatsapp_client: "YOUR WHATSAPP_CLIENT",
    phone: "XXXX",
    msg: "*TESTING THE CODE* haha",
}).then(function(result){
    console.log(result);
});
```
