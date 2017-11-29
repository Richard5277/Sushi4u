//
//

var mongoose = require('mongoose')
var Schema = mongoose.Schema

function getCustomerSchema() {
	return new Schema({
		tableNumber: { type: String },
		checkInTime: { type: String },
		orders: { type: [String] },
		totalBill: { type: String }
	})
}

module.exports = {
	getCustomerSchema: getCustomerSchema
}







