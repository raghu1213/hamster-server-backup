import Connection from './redisHelper'
export default class KeyValue {
    constructor() {
        this.db = new Connection().RedisDb;
    }

     get(key) {
        return this.db.get(key);
    }

    insert(key, value) {
        this.db.set(key, value);
        return "Saved"
    }

    delete(key) {
        this.db.del(key);
    }

    incr(key) {
        this.db.incr(key);
    }
    decr(key) {
        this.db.decr(key);
    }


}