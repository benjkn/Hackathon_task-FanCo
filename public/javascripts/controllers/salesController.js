app.controller("salesCtrl", ["$scope", "$interval", function($scope, $interval) {

 $scope.chartConfig = {
        options: {
            chart: {
                type: 'solidgauge',
               backgroundColor: '#fff'

            },
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:'#f9f9fb',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc',
                  borderColor: 'transparent'
                }
            },
            gauge: {
                dataLabels: {
                    y: -30,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{
            data: [16],
            dataLabels: {
	        	format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
                   	'<span style="font-size:12px;color:silver">km/h</span></div>'
	        }
        }],
        title: {
            text: 'Heading',
            y: 50
        },
        yAxis: {
            currentMin: 0,
            currentMax: 100,
            stops: [
                  [0, '#4fc5cd'],
                  [1, '#73b767']
                ],
            from: 0,
            to: 100,
						lineWidth: 0,
            tickInterval:0,
            tickPixelInterval: 400,
            labels: {
                y: 15
            }
        },

        loading: false
    };


	$scope.salesData = [

		{
    WeekOf: 1463950800000,
    sales: 71
  },
  	{
    WeekOf: 1463970800000,
    sales: 120
  }
	];

	$scope.salesData2 = [

		{hour: 1,sales: 5},
	    {hour: 2,sales: 12},
	    {hour: 3,sales: 87},
	    {hour: 4,sales: 564},
	    {hour: 5,sales: 645},
	    {hour: 6,sales: 56},
	    {hour: 7,sales: 5},
	    {hour: 8,sales: 8},
	    {hour: 9,sales: 8},
	    {hour: 10,sales: 30}
	];

	//animated graph with interval
/*	$interval(function(){
        var hour=$scope.salesData.length+1;
        var sales= Math.round(Math.random() * 100);
        $scope.salesData.push({hour: hour, sales:sales});
    }, 1000, 10);*/

}] );


app.directive("linearChart", ['$window', '$parse', function($window, $parse) {
	return {
		restrict: "EA",
		template: "<svg width='600' height='200'></svg>",
		controller:"salesCtrl",
		link: function(scope, elem, attrs) {
			// var exp = $parse(attrs.chartData);
			var salesDataToPlot=scope[attrs.chartData]; //exp(scope);
			//var exp2 = $parse(attrs.chartData2);
			//var salesDataToPlot2=scope[attrs.chartData2];//exp2(scope);
			var padding = 20;
			var pathClass = "path";
			var xScale, yScale, xAxisGen, yAxisGen, lineFun;

			var d3 = $window.d3;
			var rawSvg = elem.find("svg")[0];
			var svg = d3.select(rawSvg);

			// scope.$watchCollection(exp, function(newVal, oldVal){
   //             salesDataToPlot=newVal;
   //             redrawLineChart();
   //         });

			function setChartParameters(){
				  // xScale = d3.scale.linear()
				  //            .domain([0, 200])
				  //            .range([padding + 5, rawSvg.clientWidth - padding]);

              yScale = d3.scale.linear()
                .domain([0, d3.max(salesDataToPlot, function (d) {
                  return d.sales;
                })])
             .range([rawSvg.clientHeight - padding, 0]);




        var width = 700,
            height = 400,
            padding = 100;
  // define the x scale (horizontal)
        var mindate = new Date(2016,2,1),
            maxdate = new Date(2016,5,31);

         xScale = d3.time.scale()
	        .domain([mindate, maxdate])    // values between for month of january
		.range([padding, width - padding * 2]);   // map these the the chart width = total width minus padding at both sides


				  xAxisGen =  d3.svg
                        .axis()
                        .scale(xScale)
                        .ticks(12)
                        .tickSize(0)
                        .tickFormat(d3.time.format('%b %y'));

				  yAxisGen = d3.svg.axis()
				               .scale(yScale)
				               .orient("left")
				               .tickPadding(0)
				               .ticks(5);

				  lineFun = d3.svg.line()
		              .x(function (d) {
		                return xScale(new Date (d.WeekOf));
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
				        "stroke": "blue",
				        "stroke-width": 2,
				        "fill": "none",
				        "class": pathClass
				   });

				   //   svg.append("svg:path")
				   //    .attr({
				   //      d: lineFun(salesDataToPlot2),
				   //      "stroke": "red",
				   //      "stroke-width": 10,
				   //      "fill": "none",
				   //      "class": pathClass
				   // });
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