require('fetch-retry')


export default class QuandlQuery {
    constructor() {
        this.ApiKey = "?api_key=c-LWekLJ1yK23yk4WXAQ";
    }


    /**
     * gets results from quandl
     * 
     * @param {string} dbCode quandl dabase code
     * @param {string} dsCode quandl dataset code
     * @returns results promise
     * @memberof QuandlQuery
     */
    get(dbCode, dsCode) {
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
