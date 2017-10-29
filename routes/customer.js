var router = require('express').Router();
import CustomerBuilder from '../src/dataBuilder/customerDataBuilder'
import Customer from '../src/model/customer'
const PLACEHOLDER_STRING = "Customer placeholder";

var customerBuilder = new CustomerBuilder();

//insertes EOD data in Redis database base don the dataset_code provided
//http://localhost:3000/customer/insert
router.post('/insert', async function (req, res, next) {
    let reqCustomer = req.body;
    let newCustomer = new Customer();

    newCustomer.Age = reqCustomer.age;
    newCustomer.PortfolioId = 1;
    newCustomer.RetirementStatus = reqCustomer.retirementStatus;
    newCustomer.InitialInvestmentAmount = reqCustomer.initialInvestmentAmount;
    newCustomer.MaxLossPercentage = reqCustomer.maxLossPercentage;
    newCustomer.ExpectedReturn = reqCustomer.expectedReturn;
    newCustomer.InvestmentHorizon = reqCustomer.investmentHorizon;
    newCustomer.TotalRiskScore = 5;
    var result = await customerBuilder.insert(newCustomer)
    res.send(result);
});


//gets saved data from database
//e.g. http://localhost:3000/eod/get
//e.g. http://localhost:3000/eod/get?cif=123
router.get('/get', async (req, res, next) => {
    let data;
    if (req.query.cif === undefined) {
        data = await customerBuilder.getCustomers();
    }
    else {
        data =  await customerBuilder.getCustomer(req.query.cif);
    }
    res.send(JSON.stringify(data));
});


module.exports = router;
