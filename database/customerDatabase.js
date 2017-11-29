//
//

var mongoose = require('mongoose');
var Schema = require('../model/customerModel').getCustomerSchema();
var customerModel = mongoose.model('customer', Schema);


function createNewCustomer(tableNumber, callback){
    var newCustomer = new customerModel(tableNumber);
    newCustomer.save(function(err, result){
        if(err) {
            callback(true, null);
        }
        else {
            callback(false, result);
        }
    });
}




module.exports =  {

    createNewCustomer: createNewCustomer

};





