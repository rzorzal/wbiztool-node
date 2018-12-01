const fetch = require('node-fetch');

class WbizTool {

    get host(){
        return `https://wbiztool.com/api/v1`;
    }

    constructor({client_id, api_key}){

        if(!client_id || !api_key){
            throw new Error("The API needs client_id and api_key");
        }

        this.client_id = client_id;
        this.api_key = api_key;
    }

    async sendMessage({
        whatsapp_client,
        phone,
        msg,
        msg_type = 0,
        img_url = undefined,
        file_url = undefined,
        file_name = undefined,
        file = undefined,
        webhook = undefined,
    }){
        if(!whatsapp_client || !phone || !msg){
            throw new Error('sendMessage method needs whatsapp_client, phone and msg arguments');
        }

        let body = {
            phone, msg, webhook, msg_type,
            client_id: parseInt(this.client_id),
            api_key: this.api_key,
            whatsapp_client: parseInt(whatsapp_client)
        }

        if(msg_type === 1){
            if(!img_url){
                throw new Error('sendMessage method needs img_url with msg_type==1');
            }
            body = {...body, img_url};
        } else if(msg_type === 2){
            if(!file_url || !file_name){
                throw new Error('sendMessage method needs file_url and file_name and  with msg_type==2');
            }
            body = {...body, file_url, file_name};
        }

        const response = await fetch(`${this.host}/send_msg/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                "Content-Type": "application/json"
            }
        });

        if(!response.ok){
            throw new Error(response.status + " - " + response.statusText);
        }
        const data = await response.json();

        if(typeof data == "string"){
            return JSON.parse(data);
        } else {
            return data;
        }

    }


}


module.exports = WbizTool;
