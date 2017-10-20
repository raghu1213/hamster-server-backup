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

    insertIntoSortedSet(setName, key, value) {
        this.RedisDb.zadd(setName, key, value);
    }

    getAllFromSortedSet(setName) {
        return this.RedisDb.zrange(setName,0,-1)
    }
}

