var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');


var Sales = require('../models/SalesFanco');
var History = require('../models/History');
var Forecast = require('../models/Forecast');

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