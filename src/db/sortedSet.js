import Connection from './redisHelper'
export default class SortedSet {
    constructor() {
        this.db = new Connection().RedisDb;
    }

    get(setName, start, end) {
        if (start != undefined && end != undefined) {
            return this.db.zrangebyscore(setName, start, end, "WITHSCORES");
        }
        else if (start != undefined && end == undefined) {
            return this.db.zrangebyscore(setName, valueToFetch, valueToFetch, "WITHSCORES");
        }
        let zRange = this.db.zrange(setName, 0, -1);
        return zRange;
    }

    getDesc(setName, start, end, limitStart, limitEnd) {
        if (start != undefined && end != undefined) {
            return this.db.zrevrangebyscore(setName, start, end, "WITHSCORES");
        }
        else if (start != undefined && end == undefined) {
            return this.db.zrevrangebyscore(setName, valueToFetch, valueToFetch, "WITHSCORES");
        }
        else if (limitStart != undefined && limitEnd != undefined) {
            let zRange = this.db.zrevrange(setName, 0, -1, "LIMIT",limitStart, limitEnd);
            return zRange;
        }
        let zRange = this.db.zrevrange(setName, 0, -1);
        return zRange;
    }

    insert(setName, key, value) {
        this.db.zadd(setName, key, value);
    }

    delete(setName) {
        this.db.del(setName);
    }

}