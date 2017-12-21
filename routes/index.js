//
//

var sushiModelimpl = require('../moduleimpl/sushiModelimpl')
var customerModelimpl = require('../moduleimpl/customerModelimpl')
var sushiModel = require('../model/sushiModel')
var nodemailer = require('nodemailer');

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

  // GET with params
/*
  app.get('/customer/email:email', function (req, res) {
    console.log("👽 routes/index.js 👽 =========================== req.params >> ", req.params)
    var targetEmail = req.params.email
    console.log("email >> ", targetEmail)

    customerModelimpl.fetchCustomerDataByEmail(targetEmail, function(err, results) {
      if(err) {
        console.log("❗❗❗️  API >> fetch customer data by eamil error", err)
      } else {
        res.json(results)
      }
    })
  })
  */

  // GET with query
  app.get('/customer', function (req, res) {
    var targetEmail = req.query.email
    console.log("email >> ", targetEmail)

    customerModelimpl.fetchCustomerDataByEmail(targetEmail, function(err, results) {
      if(err) {
        console.log("❗❗❗️  API >> fetch customer data by eamil error", err)
    } else {
        res.json(results)
    }
})
})

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


  app.post('/updateCustomerOrder', function (req, res) {
    var email = req.query.email
    var newOrder = {
      "customerName": req.body.customerName,
      "tableNumber": req.body.tableNumber,
      "checkInTime": req.body.checkInTime,
      "totalBill": req.body.totalBill,
      "orders": req.body.orders
  }
  customerModelimpl.updateCustomerOrder(email, newOrder, function(err, result) {
      if(err) {
         console.log(err)
     } else {
      console.log(" 😃  routes/index.js 😃  -- updated customer >> \n", JSON.stringify(result))
  }
})

})

  app.get('/sendEmail',function(req,res){
    var targetEmail = req.query.email
    var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.ACCOUNT_EMAIL,
            pass: process.env.ACCOUNT_PASSWORD
        }
    })
    var mailOptions={
        from: process.env.ACCOUNT_EMAIL,
        to : targetEmail,
        subject : "Sushi4u e-bill",
        text : "Sushi4u e-bill",
        html: "<h1>Welcome to Sushi4u, here is your e-bill</h1>"
    }
    transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    })
})


}





