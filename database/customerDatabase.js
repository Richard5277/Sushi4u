//
//

var mongoose = require('mongoose');
var Schema = require('../model/customerModel').getCustomerSchema();
var customerModel = mongoose.model('customer', Schema);


function createNewCustomer(customerObject, callback){
    var newCustomer = new customerModel(customerObject)
    newCustomer.save(function(err, result){
        if(err) {
            callback(true, null)
            console.log(err)
        }
        else {
            callback(false, result)
        }
    })
}

function fetchCustomerDataByEmail(email, callback) {
    var query = {customerEmail: email}
    customerModel.find(query).exec(function(err, result) {
        if(err) {
            console.log("database/customerDatabase.js --- Fetching for target customer error: " + err)
            callback(true, null)
        }
        else {
            callback(false, result)
        }
    })
}

function updateCustomerOrder (email, newOrder, callback) {
    var query = { 'customerEmail' : email }
    customerModel.findOneAndUpdate(query, newOrder, {upsert:true}, function(err, result){
        if (err) {
            console.log(err)
            callback(true, null)
        } else {
            callback(false, result)
        }
    }) 
}


module.exports =  {

    createNewCustomer: createNewCustomer,
    fetchCustomerDataByEmail: fetchCustomerDataByEmail,
    updateCustomerOrder: updateCustomerOrder

};





