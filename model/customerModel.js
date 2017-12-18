//
//

var mongoose = require('mongoose')
var Schema = mongoose.Schema

function getCustomerSchema() {
	return new Schema({
		customerName: String,
		customerEmail: String,
		tableNumber: Number ,
		checkInTime: String,
		totalBill: Number ,
		orders: [{
			name: String, 
			quantity: Number
		}]
	})
}

module.exports = {
	getCustomerSchema: getCustomerSchema
}






