const request = require('request-promise-native');

class WbizTool {

    get host(){
        return `https://wbiztool.com/api/v1/`;
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
            whatsapp_client, phone, msg
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

        const response = await request.post(`${this.host}/send_msg/`, body);

        if(response.error){
            throw new Error(JSON.stringify(response.error));
        }

        if(typeof response.body == "string"){
            return JSON.parse(response.body);
        } else {
            return response.body;
        }

    }


}


module.exports = WbizTool;
