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

//get the data from sales collection
router.get('/sales', function(req, res) {
	// console.log('asdf')
	Sales.find(function(error, sales) {
		// console.log(sales)
		res.send(sales);
	});
});

//get data from history db collection
router.get('/history', function(req, res) {
	// console.log('hello')
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

router.get('/sales/:startingDate/:endingDate', function(req, res) {
	var total =[];
		for (i=0; i<req.after.length; i++) {
			for (j=0; j<req.before.length; j++) {
				if (req.before[j].WeekOf === req.after[i].WeekOf)
					total.push(req.before[j])
			}
		}
	res.send(total)
})

router.param('startingDate', function (req, res, next, sDate) {
	req.after = Sales.find({WeekOf: {$gt: sDate}})
	return next();
})

router.param('endingDate', function (req, res, next, eDate) {
	req.before = Sales.find({WeekOf: {$lt: eDate}})
	return next();
})


//add data to phones  collection db
router.post('/phones', function(req, res, next) {
console.log(req.body);

    var sms = new Sms(req.body);

    sms.save(function(err, phones){
        if (err) {return next(err);}

        res.json(phones);
    });

});

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

			// console.log(info);

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





module.exports = router;