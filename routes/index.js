//
//

var sushiModelimpl = require('../moduleimpl/sushiModelimpl')
var customerModelimpl = require('../moduleimpl/customerModelimpl')
var sushiModel = require('../model/sushiModel')

module.exports = function(app){

app.get('/', function(req, res) {
  console.log("U got it");
  sushiModelimpl.findAllSushi(function(err, results) {
    if(err) {
      console.log('ERR: can not get sushi data >> ' + err)
    } else {
      console.log('Successfully retrived data from sushi database >> ' + results)
      res.json(results)
    }
  })
})

app.post('/addSushi', function(req, res) {
 
  // var sushiObject = req.body
  var sushiObject = {
    "name" : req.body.name,
    "price" : req.body.price,
    "stock" : req.body.stock,
    "category" : req.body.category
  }
  sushiModelimpl.addSushi(sushiObject, function(err, result) {
    if(err) {
       console.log(err);
     } else {
       console.log(JSON.stringify(result));
     }
  })
})

// app.get('/api/signatures', function(req, res) {
//   Signature.find({}).then(eachOne => {
//     res.json(eachOne);
//   })
// })

// app.post('/api/signatures', function(req, res) {
//   Signature.create({
//     guestSignature: req.body.SignatureOfGuest,
//     message: req.body.MessageofGuest,
//   }).then(signature => {
//     res.json(signature)
//   });
// });


}
