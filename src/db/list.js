import Connection from './redisHelper'
export default class List {
    constructor() {
        this.db = new Connection().RedisDb;
    }

    get(listName) {
        let list = this.db.lrange(listName, 0, -1);
        return list;
    }

    insert(listName, value) {
        this.db.rpush(listName, value);
    }

    delete(setName) {
        this.db.del(setName);
    }

}