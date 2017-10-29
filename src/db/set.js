import Connection from './redisHelper'
export default class Set {
    constructor() {
        this.db = new Connection().RedisDb;
    }

    get(setName) {
        let set = this.db.smembers(setName)
        return set;
    }

    insert(setName, value) {

        this.db.sadd(setName, value);

    }

    delete(setName) {
        this.db.del(setName);
    }

}