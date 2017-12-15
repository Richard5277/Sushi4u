//
//

var customerDatabase = require('../database/customerDatabase')


function createNewCustomer(customerObject, callback){
    
    customerDatabase.createNewCustomer(customerObject, function(err, result) {
    	if(err) {
    		callback(true, null)
    	} else {
    		callback(false, result)
    	}
    })
}

function fetchCustomerDataByEmail(email, callback) {
	customerDatabase.fetchCustomerDataByEmail(email, function(err, result) {
		if(err) {
    		callback(true, null)
    	} else {
    		callback(false, result)
    	}
	})
}

module.exports =  {

    createNewCustomer: createNewCustomer,
    fetchCustomerDataByEmail: fetchCustomerDataByEmail

};








