var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
var twilio = require('twilio');

// Create a new REST API client to make authenticated requests against the
// twilio back end
// var client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
var client = twilio('AC1d8c69111c146aed4c8ddccdc9eca32a', '66207c3aa0e1081ac7a79ebf0371412a');



var Sales = require('../models/SalesFanco');
var History = require('../models/History');
var Forecast = require('../models/Forecast');
var Price = require('../models/Prices');
var Sms = require("../models/SmsModel");
// var Text =

// //Here are all the necessary router.get, router.post, router.put and router.param commands

//get the data from sales collection
router.get('/sales', function(req, res) {
	Sales.find(function(error, sales) {
		res.send(sales);
	});
});

//get data from history db collection
router.get('/history', function(req, res) {
	History.find(function(error, history) {
		if (error) {console.log('there is an error');}
		// console.log("gimme history");
		res.send(history);
	});
});


//get the pricing data from db collection
router.get('/revenue', function (req, res) {
	Price.find(function (error, price) {
		if (error) {console.log('error in getting prices');}
		res.send(price);
	});
});

//generate new forecast data from API
router.get('/forecast', function(req, res){
	request('http://api.openweathermap.org/data/2.5/forecast/daily?q=Boston&APPID=eae18de7d92e5fa1893eeb187956805f&cnt=16', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var data = JSON.parse(body);



	    // console.log(body);
	    res.send(body);
	  }else if(error) {
	  	console.log('there is an error');
	  }
	});
});

/*router.get('/sales/:product', function (req, res, next) {
	console.log('getting here');
	res.send(req.customData);
});

// Sales.find({$and: [{"Channel": "Direct Sales"}, {$or: [{"Neighborhood": "Allston"}, {"Neighborhood": "West End"}]}]    }).count() <--- 312
router.param('product', function (req, res, next, preferences) {
	var splitPrefs = preferences.split(',');
	console.log(splitPrefs);
	var customData =[];
	var tempVar;



	for (j=1; j<16; j++)
		if (splitPrefs[splitPrefs.length-1] === j && (j === 1 || j === 4 || j === 5 || j === 6)) {
		//prods.length AND "neighborhood".length
		var neighLength = splitPrefs[splitPrefs.length-2];
		var prodLength = splitPrefs[splitPrefs.length-3];
		if (j===1) {
			for (i=0; i<prodLength; i++) {
				for (a=prodLength; a<prodLength+neighLength; a++) {
					temp = Sales.find({$and: [{"SKU": splitPrefs[i]}, {"Neighborhood": splitPrefs[a]}, {"Channel": splitPrefs[prodLength+neighLength]}, {"WeekOf": splitPrefs[prodLength+neighLength+1]}]});
					customData.push(...temp);
				}
			}
		} else if (j === 4) {
			for (i=0; i<prodLength; i++) {
				for (a=prodLength; a<prodLength+neighLength; a++) {
					temp = Sales.find({$and: [{"SKU": splitPrefs[i]}, {"Neighborhood": splitPrefs[a]}, {"Channel": splitPrefs[prodLength+neighLength]}]});
					customData.push(...temp);
				}
			}
		} else if (j === 5) {
			for (i=0; i<prodLength; i++) {
				for (a=prodLength; a<prodLength+neighLength; a++) {
					temp = Sales.find({$and: [{"SKU": splitPrefs[i]}, {"Neighborhood": splitPrefs[a]}, {"WeekOf": splitPrefs[prodLength+neighLength]}]});
					customData.push(...temp);
				}
			}
		} else {
			for (i=0; i<prodLength; i++) {
				for (a=prodLength; a<prodLength+neighLength; a++) {
					temp = Sales.find({$and: [{"SKU": splitPrefs[i]}, {"Neighborhood": splitPrefs[a]}]});
					customData.push(...temp);
				}
			}
		}

	} else if (splitPrefs[splitPrefs.length-1] === j && (j === 2 || j === 7 || j === 8 || j === 12)) {
		//ONLY prods.length
		var prodLength = splitPrefs[splitPrefs.length-2];
		if (j===2) {
			for (i=0; i<prodLength; i++) {
				temp = Sales.find({$and: [{"Channel": splitPrefs[prodLength]}, {"WeekOf": splitPrefs[prodLength+1]}, {"SKU": splitPrefs[i]}]})
				customData.push(...temp);
			}
		} else if (j === 7) {
			for (i=0; i<prodLength; i++) {
				temp = Sales.find({$and: [{"Channel": splitPrefs[prodLength]}, {"SKU": splitPrefs[i]}]});
				customData.push(...temp);
			}
		} else if (j === 8) {
			for (i=0; i<prodLength; i++) {
				temp = Sales.find({$and: [{"WeekOf": splitPrefs[prodLength]}, {"SKU": splitPrefs[i]}]});
				customData.push(...temp);
			}
		} else {
			for (i=0; i<prodLength; i++) {
				temp = Sales.find({"SKU": splitPrefs[i]});
				customData.push(...temp);
			}
		}

	} else if (splitPrefs[splitPrefs.length-1] === j && (j === 3 || j === 9 || j === 10 || j === 13)) {
		//ONLY "neighborhood".length
		var neighLength = splitPrefs[splitPrefs.length-2];
		if (j===3) {
			for (i=0; i<neighLength; i++) {
				temp = Sales.find({$and: [{"Channel": splitPrefs[neighLength]}, {"WeekOf": splitPrefs[neighLength+1]}, {"Neighborhood": splitPrefs[i]}]});
				customData.push(...temp);
			}
		} else if (j === 9) {
			for (i=0; i<neighLength; i++) {
				temp = Sales.find({$and: [{"Channel": splitPrefs[neighLength]}, {"Neighborhood": splitPrefs[i]}]});
				customData.push(...temp);
			}
		} else if (j === 10) {
			for (i=0; i<neighLength; i++) {
				temp = Sales.find({$and: [{"WeekOf": splitPrefs[neighLength]}, {"Neighborhood": splitPrefs[i]}]});
				customData.push(...temp);
			}
		} else {
			for (i=0; i<neighLength; i++) {
				temp = Sales.find({"Neighborhood": splitPrefs[i]});
				customData.push(...temp);
			}
		}

	} else {
		// NO PROD or NEIGH
		if (j === 11) {
			customData = Sales.find({$and: [{"Channel": splitPrefs[0]}, {"WeekOf": splitPrefs[1]}]});
		} else if (j === 14) {
			customData = Sales.find({"Channel": splitPrefs[0]});
		} else {
			customData = Sales.find({"WeekOf": splitPrefs[0]});
		}
	}


	req.customData = customData;
	return next();
});*/

//add data to phones  collection db
router.post('/phones', function(req, res, next) {
console.log(req.body);

    var sms = new Sms(req.body);

    sms.save(function(err, phones){
        if (err) {return next(err);}

        res.json(phones);
    });

});

//check every 'x' minute change in temperature to send sms
// setInterval (check every 5 min)
/*setTimeout(function(){
	request('http://api.openweathermap.org/data/2.5/forecast/daily?q=Boston&APPID=eae18de7d92e5fa1893eeb187956805f&cnt=16', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  }else if(error) {
	  	console.log('there is an error');
	  }
	});
},1000);*/

router.param('lalala', function (req,res,next, text) {
	req.text = text;
	return next();
});



router.get('/alert/:lalala', function(req, res, next) {
	console.log('value1');
	//Text.findOne({latest one})
	Sms.find(function(error, users){
		if(error){ return next(error);}
		/*console.log(users);*/
		// res.send(users);
		console.log(users);
		// var phones = users;

		for (var j = 0; j < users.length; j++) {

			sendSms({
			    to: users[j].phone,
			    from:'+14134713241',
			    body: 'Hello ' + users[j].name +'! This is a message for you: ' + req.text
			});
		}

		function sendSms(info) {

			console.log(info);

				client.sms.messages.create(info, function(error, message) {
				    if (!error) {
				        console.log('Success! The SID for this SMS message is:');
				        console.log(message.sid);
				        console.log('Message sent on:');
				        console.log(message.dateCreated);
				    } else {
				        console.log('Oops! There was an error.' );
				        console.log(error);
				    }
				});


		}

		res.end();

	});
});





	/*//get list of registered phones
	var phones = [{phone:'+972542643440'}, {phone:'+972542643440'}];
	//loop through the list and send sms

	for (var i = 0; i < phones.length; i++) {

		sendSms({
		    to: phones[i].phone,
		    from:'+14134713241',
		    body:'the weather is great today!!! go out and sale FanCo '
		});
	}*/






/*var objToSend = {
    to:'+972000000000',
    from:'+14134713241',
    body:'the weather is great today!!! go out and sale FanCo '
};*/





module.exports = router;