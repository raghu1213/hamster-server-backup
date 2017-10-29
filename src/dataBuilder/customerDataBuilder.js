import KeyValueData from '../db/keyValue';
import RedisSet from '../db/set';

const CUSTOMER_SET_KEY = "CUSTOMERS"
const CUSTOMER_PREFIX = "CUSTOMER:"
const CIF_CONTER = "CUSTOMER:CIF:COUNT"

export default class CustomerDataBuilder {
    constructor() {

    }

    async insert(customer) {
        let kv = new KeyValueData();
        //first generate a new cif
        let lastCif;

        let cif = await kv.get(CIF_CONTER)
        lastCif = cif;
        let newCif = 1;
        if (lastCif != 'nil' && lastCif != null) {
            newCif++;
        }
        customer.CIF = CUSTOMER_PREFIX + newCif;
        // insert a customer object
        let result = kv.insert(customer.CIF, JSON.stringify(customer));
        //Create a list
        let set = new RedisSet();
        set.insert(CUSTOMER_SET_KEY, JSON.stringify(customer));
        return "Saved"

    }
    async getCustomer(cif) {
        let key = CUSTOMER_PREFIX + cif;
        let db = new KeyValueData();
        return await db.get(key);
    }

    async getCustomers() {
        let db = new RedisSet();
        let data = await db.get(CUSTOMER_SET_KEY);
        return data;
    }

} 