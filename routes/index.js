var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
var twilio = require('twilio');


//============================= twilio =====================================
// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.
client.sms.messages.create({
    to:'+972000000000',
    from:'+14134713241',
    body:'the weather is great today!!! go out and sale FanCo '
}, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);

        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.' );
        console.log(error);
    }
});
////============================= twilio =====================================


var Sales = require('../models/SalesFanco');
var History = require('../models/History');
var Forecast = require('../models/Forecast');
var Price = require('../models/Prices');

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
		console.log("gimme history");
		res.send(history);
	});
});


//get the pricing data from db collection
router.get('/revenue', function (req, res) {
	Price.find(function (error, price) {
		if (error) {console.log('error in getting prices');}
		console.log (' i am in server side get /revenue');
		res.send(price);
	});
});

//generate new forecast data from API
router.get('/forecast', function(req, res){
	request('http://api.openweathermap.org/data/2.5/forecast/daily?q=Boston&APPID=eae18de7d92e5fa1893eeb187956805f&cnt=16', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // console.log(body);
	    res.send(body);
	  }else if(error) {
	  	console.log('there is an error');
	  }
	});
});




/*router.param('product', function (req, res, next, preferences) {
	console.log(preferences)
	//all 3 params
	if (preferences.Neighborhood && preferences.SKU && preferences.Channel) {
		Sales.find({Neighborhood: preferences.Neighborhood, SKU: preferences.SKU, Channel: preferences.Channel}).exec(function (err, sale) {
			if (err) {console.log ('error!');}
			if (!sale) {return next(new Error('no matches found')); }
			req.sale = sale;
			return next();
		});
	//2 of 3 params, 3rd "all"
	} else if (preferences.Neighborhood && preferences.SKU && !preferences.Channel) {
		Sales.find({Neighborhood: preferences.Neighborhood, SKU: preferences.SKU}).exec(function (err, sale) {
			if (err) {console.log ('error!');}
			if (!sale) {return next(new Error('no matches found')); }
			req.sale = sale;
			return next();
		});
	} else if (preferences.Neighborhood && !preferences.SKU && preferences.Channel) {
		Sales.find({Neighborhood: preferences.Neighborhood, Channel: preferences.Channel}).exec(function (err, sale) {
			if (err) {console.log ('error!');}
			if (!sale) {return next(new Error('no matches found')); }
			req.sale = sale;
			return next();
		});
	} else if (!preferences.Neighborhood && preferences.SKU && preferences.Channel) {
		Sales.find({SKU: preferences.SKU, Channel: preferences.Channel}).exec(function (err, sale) {
			if (err) {console.log ('error!');}
			if (!sale) {return next(new Error('no matches found')); }
			req.sale = sale;
			return next();
		});
	//Only one of 3 params, rest 2 "all"
	} else if (preferences.Neighborhood) {
		Sales.find({Neighborhood: preferences.Neighborhood}).exec(function (err, sale) {
		if (err) {console.log ('error!');}
		if (!sale) {return next(new Error('no matches found')); }
		req.sale = sale;
		return next();
		});
	} else if (preferences.SKU) {
		Sales.find({SKU: preferences.SKU}).exec(function (err, sale) {
		if (err) {console.log ('error!');}
		if (!sale) {return next(new Error('no matches found')); }
		req.sale = sale;
		return next();
		});
	} else if (preferences.Channel) {
		Sales.find({Channel: preferences.Channel}).exec(function (err, sale) {
		if (err) {console.log ('error!');}
		if (!sale) {return next(new Error('no matches found')); }
		req.sale = sale;
		return next();
		});
	}
});*/

module.exports = router;