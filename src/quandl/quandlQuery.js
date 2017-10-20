var RESTClient = require('node-rest-client').Client;

export default class QuandlQuery {
    constructor() {
        this.ApiClient = new RESTClient();
        this.ApiKey = "?api_key=c-LWekLJ1yK23yk4WXAQ";
    }

    get(dbCode, dsCode, format) {
        this.ApiClient.get("https://www.quandl.com/api/v3/datasets/" + dbCode + '/' + dsCode + '.' + format + this.ApiKey, function (data, response) {
            return data;
        });
    }
}    
