import Connection from './redisHelper'
export default class KeyValue {
    constructor() {
        this.db = new Connection().RedisDb;
    }

    get(setName) {
        let set = this.db.get(setName);
        return set;
    }

    insert(setName, value) {
        this.db.set(setName, value);
    }

    delete(setName) {
        this.db.del(setName);
    }

}