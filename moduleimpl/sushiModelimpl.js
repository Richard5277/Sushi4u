//
//


var sushiDatabase = require('../database/sushiDatabase')

function findAllSushi(callback) {
	sushiDatabase.findAllSushi(function(err, result) {
		if(err) {
			callback(true, null)
		} else {
			callback(false, result)
		}
	})
}

function addSushi(sushiObject, callback) {
	sushiDatabase.addSushi(sushiObject, function(err, result) {
		if (err) {
			console.log("=== sushiModelimpl.js === : error >> ", err)
			callback(true, null)
		} else {
			callback(false, result)
		}
	})
}

module.exports = {
	findAllSushi : findAllSushi,
	addSushi: addSushi
}




