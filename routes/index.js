//
//

var sushiModelimpl = require('../moduleimpl/sushiModelimpl')
var customerModelimpl = require('../moduleimpl/customerModelimpl')
var sushiModel = require('../model/sushiModel')

const nodemailer = require('nodemailer')

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

    // send email
    console.log("=======================  new 💌 💌 💌 =============================")

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'peter.feihong92@gmail.com',
        pass: 'forgooglemap'
      }
    });

    var mailOptions = {
      from: 'peter.feihong92@gmail.com',
      to: 'richard.dev@icloud.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html: '<b>Hello world?</b>'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });


  })


  app.post('/updateCustomerOrder:email', function (req, res) {
    var email = req.params.email
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

    // send email
    console.log("=======================  update 💌 💌 💌 =============================")

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'peter.feihong92@gmail.com',
        pass: 'forgooglemap'
      }
    });

    var mailOptions = {
      from: 'peter.feihong92@gmail.com',
      to: 'richard.dev@icloud.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html: '<b>Hello world?</b>'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  })


}





