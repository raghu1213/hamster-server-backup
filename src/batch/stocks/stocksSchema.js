var mongoose = require('mongoose')

var stocksSchema = new mongoose.Schema({
    _id =mongoose.Schema.Types.ObjectId,
    symbol: String,
    Name: String,
    MarketCap: Number,
    IpoYear: Date,
    Sector: String,
    Industry: String,
    DataRefrenceData: Date

})

var Stock = mongoose.model("Stock", stocksSchema);
module.exports = Stock;