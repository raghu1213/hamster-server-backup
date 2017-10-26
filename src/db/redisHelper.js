var Redis = require('ioredis')
export default class RedisHelper {
    constructor() {
        //new Redis('redis-13868.c15.us-east-1-2.ec2.cloud.redislabs.com:13868');
        this.RedisDb = new Redis({
            port: 13868,          // Redis port
            host: 'redis-13868.c15.us-east-1-2.ec2.cloud.redislabs.com',   // Redis host
            password: 'CS@Hack2017'
        });

    }

    testConnection() {
        if (this.RedisDb != undefined && this.RedisDb.status != '') {
            let isPinging = new Promise((resolve, reject) => {
                try {
                    var test = this.RedisDb.ping(function (err, result) {
                        console.log('Ping-' + result)
                        if (err != null) {
                            reject("Redis connection failed--" + err)
                        }
                        resolve('PING-' + result);
                    });
                }
                catch (e) {
                    reject(e);
                }
            });
            return isPinging;
        }
    }
}

