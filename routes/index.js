//
//

var sushiModelimpl = require('../moduleimpl/sushiModelimpl')
var customerModelimpl = require('../moduleimpl/customerModelimpl')
var sushiModel = require('../model/sushiModel')

module.exports = function(app){

app.get('/', function(req, res) {
  sushiModelimpl.findAllSushi(function(err, results) {
    if(err) {
      console.log('ERR: can not get sushi data >> ' + err)
    } else {
      res.json(results)
    }
  })
})

app.post('/addSushi', function(req, res) {
 
  var sushiObject = {
    "name" : req.body.name,
    "price" : req.body.price,
    "stock" : req.body.stock,
    "category" : req.body.category
  }
  sushiModelimpl.addSushi(sushiObject, function(err, result) {
    if(err) {
       console.log(err)
     } else {
       console.log(JSON.stringify(result))
     }
  })
})

app.get('/customer:email', function (req, res) {
  var targetEmail = req.params.email
  customerModelimpl.fetchCustomerDataByEmail(targetEmail, function(err, results) {
    if(err) {
      console.log("❗❗❗️  API >> fetch customer data by eamil error", err)
    } else {
      console.log("😃 😃 😃 API >> fetch customer data by eamil success , result >>\n", results)
      res.json(results)
    }
  })
})

/*
app.get('/article:id', function(req, res){
    console.log(" --- Request for id ---: " + req.params.id);
    var targetID = req.params.id;
    articleModelImpl.fetchArticleForID(targetID, function(err, result){
      if(err) {
        console.log("fetching data from database err >>> ::: " + err);
      }
      else {
        console.log("routes/index.js --- Fetching target article result >>> :::" + result);
        res.render('article',{
          title: 'Article',
          article: result
        });
      }
    });

  });
*/

app.post('/newCustomer', function(req,res) {

  var customerObject = {
    "customerName": req.body.customerName,
    "customerEmail": req.body.customerEmail,
    "tableNumber": req.body.tableNumber,
    "checkInTime": req.body.checkInTime,
    "totalBill": req.body.totalBill,
    "orders": req.body.orders
  }
  customerModelimpl.createNewCustomer(customerObject, function (err, result) {
    if(err) {
       console.log(err)
     } else {
       console.log("😃 😃 😃 new customer >> \n", JSON.stringify(result))
     }
  })
})



}
