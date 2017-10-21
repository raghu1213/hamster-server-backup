var RESTClient = require('node-rest-client').Client;
require('fetch-retry')
export default class QuandlQuery {
    constructor() {
        this.ApiClient = new RESTClient();
        this.ApiKey = "?api_key=c-LWekLJ1yK23yk4WXAQ";
    }

    get(dbCode, dsCode, callback) {
        var url = "https://www.quandl.com/api/v3/datasets/" + dbCode + '/' + dsCode + '.json' + this.ApiKey;
        return fetch(url, {
            retries: 2,
            retryDelay: 1000,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(o => { return o.json() });

    }
}    
