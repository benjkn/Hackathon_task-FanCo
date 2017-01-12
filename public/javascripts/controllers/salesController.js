app.controller("salesCtrl", ["$scope", "$interval", function($scope, $interval) {

$scope.testing = function () {

	// var parseDate = d3.timeParse("%Y-%m-%d");

	d3.csv("javascripts/controllers/FanCoSales.csv")
    .row(function(d){ return { Day: d["Week Of"], Neighborhood: d["Neighborhood"], SKU: d["SKU"], Channel: d["Channel"], Sales: Number(d["Sales (Units)"])}; })
    .get(function(error, data){
    	if (error) {console.log(error)}
    	console.log(data)
      $scope.salesData = data
    })
}

$scope.testing()


	// $interval(function(){
 //        var hour=$scope.salesData.length+1;
 //        var sales= Math.round(Math.random() * 100);
 //        $scope.salesData.push({hour: hour, sales:sales});
 //    }, 1000, 10);

}] );


app.directive("linearChart", ['$window', '$parse', function($window, $parse) {
	return {
		restrict: "EA",
		template: "<svg width='600' height='200'></svg>",

		controller:"salesCtrl",
		link: function(scope, elem, attrs) {
			var exp = $parse(attrs.chartData);
			var salesDataToPlot=exp(scope);
			// console.log(salesDataToPlot);
			var padding = 20;
			var pathClass = "path";
			var xScale, yScale, xAxisGen, yAxisGen, lineFun;

			var d3 = $window.d3;
			var rawSvg = elem.find("svg")[0];
			var svg = d3.select(rawSvg);

			// scope.$watchCollection(exp, function(newVal, oldVal){
	  //     salesDataToPlot=newVal;
	  //     console.log ('newVal:' + newVal);
	  //     console.log ('oldVal:' + oldVal);
	  //     console.log ('exp:' + exp);
	  //     redrawLineChart();
   // 		});

			function setChartParameters(){
				xScale = d3.scale.linear()
        .domain([salesDataToPlot[0].Day, salesDataToPlot[salesDataToPlot.length - 1].Day])
        .range([padding + 5, rawSvg.clientWidth - padding]);

        yScale = d3.scale.linear()
        .domain([0, d3.max(salesDataToPlot, function (d) {
        	return d.Sales;
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
          return xScale(d.Day);
        })
        .y(function (d) {
          return yScale(d.Sales);
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