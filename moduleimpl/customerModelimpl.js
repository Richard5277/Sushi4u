var customerDatabase = require('../database/customerDatabase')


function createNewCustomer(tableNumber, callback){
    
    customerDatabase.createNewCustomer(tableNumber, function(err, result) {
    	if(err) {
    		callback(true, null)
    	} else {
    		callback(false, result)
    	}
    })

}

module.exports =  {

    createNewCustomer: createNewCustomer

};








