let Wbiz = require('./index.js');


const wbizInstance = new Wbiz({
    client_id: "363",
    api_key: "a6fe6575e98a4dc382c6c54cd3bc1347332766f2"
});

wbizInstance.sendMessage({
    whatsapp_client: "495",
    phone: "5527981412097",
    msg: "Testando o código",
}).then(function(result){
    console.log(result);
});
