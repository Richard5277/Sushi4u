//
//

var mongoose = require('mongoose')
var Schema = mongoose.Schema

function getSushiSchema() {
	return new Schema({
		name: { type: String },
		price: { type: String },
		stock: { type: String },
		category: { type: String }
	})
}

module.exports = {
	getSushiSchema: getSushiSchema
}



