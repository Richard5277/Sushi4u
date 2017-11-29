//
//


var mongoose = require('mongoose');
var Schema = require('../model/sushiModel').getSushiSchema();
var sushiModel = mongoose.model('sushi', Schema);


function findAllSushi(callback) {

    sushiModel.find(function(err, result){
       if(err) {
       	   console.log("=== error ===\n>> " , err)
           callback(true, null);
       }
       else {
           callback(false, result);
       }
    });

}

function addSushi(sushiObject, callback) {
	var newSushi = new sushiModel(sushiObject)
	newSushi.save(function(err, result) {
		if(err) {
			console.log("=== error ===\n>> ", err)
			callback(true, err)
		}else {
			console.log("new sushi saved >> ", result)
			callback(false, result)
		}
	})
}

module.exports = {
	findAllSushi: findAllSushi,
	addSushi: addSushi
}



