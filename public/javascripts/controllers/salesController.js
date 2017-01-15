app.controller("salesCtrl", ["$scope", "$interval","sales", function($scope, $interval, sales) {

// filter the array to get specific data



$scope.salesData = [];
// init sales collection with new values
 sales.getAll().then(function(products){
	$scope.salesData = products.data;
 	 	console.log($scope.salesData);
 });



	$interval(function(){
        var WeekOf=$scope.salesData.length+1;
        var SalesUnits= Math.round(Math.random() * 50)+30;
        $scope.salesData.push({WeekOf: WeekOf, SalesUnits:SalesUnits});
    }, 1000, 10);

}] ); // end of controller


app.directive("linearChart", ['$window', '$parse', function($window, $parse) {
	return {
		restrict: "EA",
		template: "<svg width='600' height='200'></svg>",
		controller:"salesCtrl",
		link: function(scope, elem, attrs) {
			var exp = $parse(attrs.chartData);
			var salesDataToPlot=exp(scope);
			var padding = 20;
			var pathClass = "path";
			var xScale, yScale, xAxisGen, yAxisGen, lineFun;

			var d3 = $window.d3;
			var rawSvg = elem.find("svg")[0];
			var svg = d3.select(rawSvg);

			scope.$watchCollection(exp, function(newVal, oldVal){
	        salesDataToPlot=newVal;
	        redrawLineChart();
   		});

			function setChartParameters(){

			//define x scale horizontal

			var mindate = new Date(2015,0,1);
			var maxdate = new Date(2016,12,31);

			xScale = d3.time.scale()
		.domain([mindate, maxdate])
		.range([padding + 5, rawSvg.clientWidth - padding]);
				// xScale = d3.scale.linear()
    //     .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length - 1].hour])
    //     .range([padding + 5, rawSvg.clientWidth - padding]);

        yScale = d3.scale.linear()
        .domain([0, d3.max(salesDataToPlot, function (d) {
        	return d.SalesUnits;
      	})])
        .range([rawSvg.clientHeight - padding, 0]);

				xAxisGen = d3.svg.axis()
	      .scale(xScale)
	      .orient("bottom");
	      // .ticks(salesDataToPlot.length - 1);

			  yAxisGen = d3.svg.axis()
      	.scale(yScale)
      	.orient("left")
      	.tickPadding(0)
      	.ticks(5);

				lineFun = d3.svg.line()
        .x(function (d) {
          return xScale(new Date(d.WeekOf));
        })
        .y(function (d) {
          return yScale(d.SalesUnits);
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
	        "stroke": "blue",
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