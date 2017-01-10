//NOt for now!!!****************************************************


// // "use strict"

// var fs = require('fs');
// var mongoose = require('mongoose');


// // Converter = require('csvtojson').Converter,
// // converter = new Converter();
// var converter = require('csvtojson')



// var SaleSchema = new mongoose.Schema({
//   'Week Of': String,
//   City: String,
//   Neighborhood: String,
//   Product: String,
//   SKU: String,
//   Channel: String,
//   'Sales (Units)': {type: Number, default: 0}
// });

// SaleSchema.methods.convertToJson = (file) => {
//   var data = [];
//   return new Promise( (resolve, reject) => {
//     converter()
//     .fromFile(file)
//     .on('json', (jsonObj) => {

//       var sales = new SaleSchema;
//       data.push(sales)

//     })
//     .on('done', (error) => {
//       console.log('end')
//     })
//   });
// };






 
//     converter.on("end_parsed", function(jsonData) {
//       if(!jsonData) {
//        console.log('failed');
//         reject("CSV to JSON conversion failed!")
//       }
      
//       console.log("Finished parsing");
//       console.log(data);
//       resolve(data);
//     });
//     // Using the converters' property ignoreEmpty fails to read data from specific line,
//     // in order overcome it, converted file with empty lines
//     // and run the event "record_parsed" to loop over data and remove empty objects using one of properties
//     // https://github.com/Keyang/node-csvtojson
//     converter.on("record_parsed", (obj) => {
//       if (obj['Week Of'] !== '') {
//         data.push(obj)
//       }
//     });
//     fs.createReadStream(file).pipe(converter);
//   using fs to read a file and process using converter
//   // fs.createReadStream(file).pipe(converter).pipe(fs.createWriteStream("data/outputData1.json"));

// let Sale = mongoose.model('Sale', SaleSchema);

// module.exports = Sale;








// "use strict"
// const fs = require('fs'),
//       mongoose = require('mongoose'),
//       Converter = require('csvtojson').Converter,
//       converter = new Converter();

// let SaleSchema = new mongoose.Schema({
//   'Week Of': String,
//   City: String,
//   Neighborhood: String,
//   Product: String,
//   SKU: String,
//   Chanel: String,
//   'Sales (Units)': {type: Number, default: 0}
// });

// SaleSchema.methods.convertToJson = (file) => {
//   // promise to handle data from file
//   var data = [];
//   // handling res / rej;
//   return new Promise( (resolve, reject) => {
//     // after finished with looping and stored data inside the new var
//     // calling successful Promise in order send a data
//     converter.on("end_parsed", function(jsonData) {
//       if(!jsonData) {
//         reject("CSV to JSON conversion failed!")
//       }
      
//       console.log("Finished parsing");
//       resolve(data);
//     });
//     // Using cthe converters' property ignoreEmpty fails to read data from specific line,
//     // in order overcome it, converted file with empty lines
//     // and run the event "record_parsed" to loop over data and remove empty objects using one of properties
//     // https://github.com/Keyang/node-csvtojson
//     converter.on("record_parsed", (obj) => {
//       if (obj['Week Of'] !== '') {
//         data.push(obj)
//       }
//     });
//     fs.createReadStream(file).pipe(converter);
//   });
//   // using fs to read a file and process using converter
//   fs.createReadStream(file).pipe(converter).pipe(fs.createWriteStream("data/outputData1.json"));
// };

// let Sale = mongoose.model('Sale', SaleSchema);

// module.exports = Sale;