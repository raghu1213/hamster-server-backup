var Redis = require('ioredis')
export default class RedisHelper{
    constructor()
    {
        this.RedisDb = new Redis('127.0.0.1:6379');
    }
    
    testConnection()
    {
        if (this.RedisDb != undefined && this.RedisDb.status != '')
        {
            return this.RedisDb.status;
        }  
        return 'Invalid state'
    }

    SetDataSetHeaders(dataset_code, value) {
        this.RedisDb.set("HEADER:" + dataset_code, value);
    }

    GetDataSetHeader(dataset_code) {
        return this.RedisDb.get("HEADER:" + dataset_code);
    }

    insertIntoSortedSet(setName, key, value) {
        this.RedisDb.zadd(setName, key, value);
    }

    getAllFromSortedSet(setName) {
        let zRange = this.RedisDb.zrange(setName, 0, -1);
        return zRange;
    }
}

