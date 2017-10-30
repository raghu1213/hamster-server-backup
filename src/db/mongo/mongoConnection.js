var MongoClient = require('mongodb').MongoClient;
//mongodb://<dbuser>:<dbpassword>@ds115573.mlab.com:15573/mongo-hamster
const url = "mongodb://mongo-hamster:CS%40Hack2017@ds115573.mlab.com:15573/mongo-hamster";

function execute(action) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Executing on DB" + url);
        if (action != undefined) {
            action(db);
        }
        db.close();
        return "Executed on DB" + url;
    });

}
module.exports = execute

