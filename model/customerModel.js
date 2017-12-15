//
//

var mongoose = require('mongoose')
var Schema = mongoose.Schema

function getCustomerSchema() {
	return new Schema({
		customerName: String,
		customerEmail: String,
		tableNumber: String ,
		checkInTime: String,
		totalBill: String ,
		orders: [{
			name: String, 
			quantity: String
		}]
	})
}

module.exports = {
	getCustomerSchema: getCustomerSchema
}






