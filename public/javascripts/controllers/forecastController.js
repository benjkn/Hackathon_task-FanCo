/*app.controller('ForecastCtrl', ['$scope','$http', '$rootScope', function($scope, $http, $rootScope){

$scope.forecastArr = [];
// console.log($scope.getData);
//forecastArray contains 15 OBJECTS with date and temp!!!!!!!!!
$scope.getData = function () {
	return $http.get('/forecast').then(function(response, err) {
		if (err) {console.log(err);}
		var temporary = response.data.list;
		// console.log (temporary);
		// var forecastArray = [];
		for (i=1; i<temporary.length; i++) {
			day = ((new Date(temporary[i].dt*1000))+1).slice(4, 10);
			var obj = {
				date: day,
				temp: Math.floor((temporary[i].temp.day-273.15)*100)/100
			};
			$scope.forecastArr.push(obj);
		}
		$rootScope.forecastArray = $scope.forecastArr;

		console.log($rootScope.forecastArray);
	});
};

$scope.getData();

}]);


//create a custom directive to show the graph
app.directive("forecastChart", ['$window', '$parse', '$rootScope', function($window, $parse, $rootScope) {
	console.log('im the directive');
	return {
		restrict: "EA",
		template: "<svg width='600' height='200'></svg>",
		controller:"ForecastCtrl",
		link: function(scope, elem, attrs) {
			var exp = $parse(attrs.chartData);
			console.log(exp);
			// var forecastArrayToPlot=exp(scope);
			var forecastArrayToPlot = $rootScope;
			var hello = forecastArrayToPlot.forecastArray;
			console.log(forecastArrayToPlot);
			console.log(hello);
			// console.log(forecastArrayToPlot);
			// console.log($rootScope);
			// console.log($rootScope.$root.forecastArray);
			var padding = 20;
			var pathClass = "path";
			var xScale, yScale, xAxisGen, yAxisGen, lineFun;

			var d3 = $window.d3;
			var rawSvg = elem.find("svg")[0];
			var svg = d3.select(rawSvg);

			// scope.$watchCollection(exp, function(newVal, oldVal){
	  //     forecastArrayToPlot=newVal;
	  //     redrawLineChart();
   // 		});

			var setChartParameters = function (){

				xScale = d3.scale.linear()
        .domain([forecastArrayToPlot[0].date, forecastArrayToPlot[forecastArrayToPlot.length - 1].date])
        .range([padding + 5, rawSvg.clientWidth - padding]);

        yScale = d3.scale.linear()
        .domain([0, d3.max(forecastArrayToPlot, function (d) {
        	return d.temp;
      	})])
        .range([rawSvg.clientHeight - padding, 0]);

				xAxisGen = d3.svg.axis()
			      .scale(xScale)
			      .orient("bottom")
			      .ticks(forecastArrayToPlot.length - 1);

			  yAxisGen = d3.svg.axis()
		      	.scale(yScale)
		      	.orient("left")
		      	.tickPadding(0)
		      	.ticks(5);

				lineFun = d3.svg.line()
        .x(function (d) {
          return xScale(d.date);
        })
        .y(function (d) {
          return yScale(d.temp);
        })
        .interpolate("basis");
			};

			setChartParameters();

			var drawLineChart = function() {

			  setChartParameters();

			  svg.append("svg:g")
			    .attr("class", "x axis")
			    .attr("transform", "translate(0,180)")
			    .call(xAxisGen);

			  svg.append("svg:g")
			      .attr("class", "y axis")
				  .attr("transform", "translate(20,0)")
				  .call(yAxisGen);

			  svg.append("svg:path")
			  .attr({
			        d: lineFun(forecastArrayToPlot),
			        "stroke": "blue",
			        "stroke-width": 2,
			        "fill": "none",
			        "class": pathClass
			  });
			};

			function redrawLineChart() {

		        setChartParameters();

		        svg.selectAll("g.y.axis").call(yAxisGen);

		        svg.selectAll("g.x.axis").call(xAxisGen);

		        svg.selectAll("."+pathClass)
		        .attr({
		          d: lineFun(forecastArrayToPlot)
		        });
	    	}

			drawLineChart();
		}
	};
}]);*/

//==================================================================================

app.controller("ForecastCtrl", ["$scope", "forecast", function($scope, forecast) {

	$scope.gettheforecast = function () {
		forecast.getForecast().then(function (hello) {
			console.log(hello.data);
			$scope.forecastData = hello.data
		})
	}

	$scope.forecastData = [

		{hour: 12,sales: 11.31},
	    {hour: 13,sales: 6.43},
	    {hour: 14,sales: -4.05},
	    {hour: 15,sales: 1.12},
	    {hour: 16,sales: 6.87},
	    {hour: 17,sales: 2.37},
	    {hour: 18,sales: 2.47},
	    {hour: 19,sales: 4.93},
	    {hour: 20,sales: 2.72},
	    {hour: 21,sales: 3.84},
	    {hour: 22,sales: 2.9},
	    {hour: 23,sales: 6.09},
	    {hour: 24,sales: 7.08},
	    {hour: 25,sales: 5},
	    {hour: 26,sales: 4.75}

	];

}] );


app.directive("helloChart", ['$window', '$parse', function($window, $parse) {
	return {
		restrict: "EA",
		template: "<svg width='600' height='200'></svg>",
		controller:"ForecastCtrl",
		link: function(scope, elem, attrs) {
			var exp = $parse(attrs.chartData);
			var salesDataToPlot=exp(scope);
			var padding = 20;
			var pathClass = "path";
			var xScale, yScale, xAxisGen, yAxisGen, lineFun;

			var d3 = $window.d3;
			var rawSvg = elem.find("svg")[0];
			var svg = d3.select(rawSvg);

/*			scope.$watchCollection(exp, function(newVal, oldVal){
	      salesDataToPlot=newVal;
	      redrawLineChart();
   		});*/

			function setChartParameters(){
				xScale = d3.scale.linear()
        .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length - 1].hour])
        .range([padding + 5, rawSvg.clientWidth - padding]);

        yScale = d3.scale.linear()
        .domain([0, d3.max(salesDataToPlot, function (d) {
        	return d.sales;
      	})])
        .range([rawSvg.clientHeight - padding, 0]);

				xAxisGen = d3.svg.axis()
	      .scale(xScale)
	      .orient("bottom")
	      .ticks(salesDataToPlot.length - 1);

			  yAxisGen = d3.svg.axis()
      	.scale(yScale)
      	.orient("left")
      	.tickPadding(0)
      	.ticks(5);

				lineFun = d3.svg.line()
        .x(function (d) {
          return xScale(d.hour);
        })
        .y(function (d) {
          return yScale(d.sales);
        })
        .interpolate("basis");
			}

			function drawLineChart() {

			  setChartParameters();

			  svg.append("svg:g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0,180)")
		    .call(xAxisGen);

			  svg.append("svg:g")
	      .attr("class", "y axis")
			  .attr("transform", "translate(20,0)")
			  .call(yAxisGen);

			  svg.append("svg:path")
			  .attr({
	        d: lineFun(salesDataToPlot),
	        "stroke": "orange",
	        "stroke-width": 2,
	        "fill": "none",
	        "class": pathClass
			  });
			}

			function redrawLineChart() {

        setChartParameters();

        svg.selectAll("g.y.axis").call(yAxisGen);

        svg.selectAll("g.x.axis").call(xAxisGen);

        svg.selectAll("."+pathClass)
        .attr({
          d: lineFun(salesDataToPlot)
        });
    	}

			drawLineChart();
		}
	};
}]);