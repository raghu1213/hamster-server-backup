import Connection from './redisHelper'
export default class Hash {
    constructor() {
        this.db = new Connection().RedisDb;
    }

    get(key) {
        let hash = this.db.hget(key)
        return hash;
    }
    
    insert(setName, arrayOfKeyValue) {
        for (let kv of arrayOfKeyValue) {
            this.db.hset(setName, kv.key, kv.value);
       }
    }

    delete(setName) {
        this.db.del(setName);
    }

}