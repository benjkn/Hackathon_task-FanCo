app.controller("ForecastCtrl", ["$scope", "forecast", function($scope, forecast) {

	$scope.forecastData = [];
	var temporary =[]

	$scope.gettheforecast = function () {
		forecast.getForecast().then(function (hello) {
			temporary = hello.data
		for (i=0; i<temporary.length; i++) {
			obj = {
				date: (new Date(temporary[i].day)+10).slice(4,10),
				temp: Math.round((temporary[i].temp-273.15)*100)/100
			};
			$scope.forecastData.push(obj)
		}
		})
		console.log($scope.forecastData);
	}

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


			function setChartParameters(){
				xScale = d3.scale.linear()
        .domain([salesDataToPlot[0].date, salesDataToPlot[salesDataToPlot.length - 1].date])
        .range([padding + 5, rawSvg.clientWidth - padding]);

        yScale = d3.scale.linear()
        .domain([0, d3.max(salesDataToPlot, function (d) {
        	return d.temp;
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
          return xScale(d.date);
        })
        .y(function (d) {
          return yScale(d.temp);
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