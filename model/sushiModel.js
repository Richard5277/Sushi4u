//
//

var mongoose = require('mongoose')
var Schema = mongoose.Schema

function getSushiSchema() {
	return new Schema({
		name: { type: String },
		price: { type: Number },
		stock: { type: Number },
		category: { type: String }
	})
}

module.exports = {
	getSushiSchema: getSushiSchema
}



