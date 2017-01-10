var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
const csv=require('csvtojson')

//Models to be added here if necessary

var Sale = require('../models/Sales');

//Here are all the necessary router.get, router.post, router.put and router.param commands

// **************************converting fails**************************
// router.get('/sales', function (req, res) {
// 	console.log('hey')

// 	var sales = new Sales();

// 	sales.convertToJson('../data/FanCoSales.csv').then((data) => {
// 		Sales.collection.insertMany(data)
// 	}, function(err) {
// 		console.error(err);
// 	});

// 	sales.save(function(err, data) {
// 		if (err) {return console.error(err)}
// 		console.log(data);
// 		res.end();
// 	});
// });


// router.get('/getSales', (req, res, next) => {
	
// 	const csvFilePath='../data/FanCoSales.csv'
// 	const csv=require('csvtojson')
// 	csv()
// 	.fromFile(csvFilePath)
// 	.on('json',(jsonObj)=>{
// 	    // combine csv header row and csv line to a json object 
// 	    // jsonObj.a ==> 1 or 4 
// 	})
// 	.on('done',(error)=>{
// 	    console.log('end')
// 	})

// });

// var myReadStream = fs.createReadStream(__dirname + '/data/FanCoSales.csv', {encoding: 'utf8'});
// var myWriteStream = fs.createWriteStream(__dirname + '/data/FancoSalesConverted.json');

// myReadStream.pipe(csv).pipe(myWriteStream);
// ********************************************************************


module.exports = router;