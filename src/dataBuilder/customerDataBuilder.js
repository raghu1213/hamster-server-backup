import KeyValueData from '../db/keyValue';
import RedisSet from '../db/set';

const CUSTOMER_KEY = "CUSTOMERS"
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
        customer.CIF = "CUSTOMER:"+ newCif;
        // insert a customer object
        let result = kv.insert(customer.CIF, JSON.stringify(customer));
        //Create a list
        let set = new RedisSet();
        set.insert(CUSTOMER_KEY, JSON.stringify(customer));
        return "Saved"

    }
    getCustomer(cif) {
        let db = new KeyValueData();
        return db.get(cif);
    }

    getCustomers() {
        return getFullDataFromCustomerList();
    }

    getFullDataFromCustomerList() {
        var isCustomerFound = new Promise((resolve, reject) => {
            try {
                let db = new RedisList();
                db.get(CUSTOMER_KEY).then(data => {
                    resolve(data);
                })
            }
            catch (err) {
                reject(err);
            }
        });
        return isCustomerFound;
    }
}