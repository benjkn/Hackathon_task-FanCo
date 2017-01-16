app.directive("forecastChart", [ 'forecast', function(forecast) {

  var link = function($scope, $el, $attrs){

    $scope.forecastData = [];

		forecast.getForecast().then(function(response){
      console.log(response);
      $scope.forecastData = response.data;
      console.log($scope.forecastData);

  		//Nest + Rollup for Total Sales
     /* var totalData = d3.nest()
			.key(function(d){ return (d.WeekOf); }).sortKeys(d3.ascending)
			.rollup(function(d){
				return d3.sum(d, function(g){
				  return g.SalesUnits;
				});
			}).entries($scope.forecastData);
			console.log(totalData);*/


  		// parse the date!
      // var parseDate = d3.time.format("%Y-%m-%d").parse;
  		for ( i=0; i<$scope.forecastData.length; i++) {
        $scope.forecastData[i].day = new Date($scope.forecastData[i].day*1000);
        $scope.forecastData[i].temp = Math.round(($scope.forecastData[i].temp-273.15)*100)/100;
  		}
  		console.log($scope.forecastData[0]);


      // Declare height and width variables(pixels)
      var height = 300;
      var width = 1000;
      // total = 0;
      // Work out extremes
      var maxTemp = d3.max($scope.forecastData,function(d,i){
        return d.temp;
      });
      console.log("Max Temp for a day is: " + maxTemp);

      var minTemp  = d3.min($scope.forecastData,function(d,i){
        return d.temp;
      });
      console.log("Min Temp for a day is: " + minTemp);

      // find max value day
      for ( i=0; i<$scope.forecastData.length; i++) {
        if ($scope.forecastData[i].temp === maxTemp){
          console.log("hottest shit temp on " + $scope.forecastData[i].day);
        }

        if($scope.forecastData[i].temp === minTemp){
          console.log("coldest shit temp on " + $scope.forecastData[i].day);
        }
      }

      var minDate = d3.min($scope.forecastData,function(d){ return d.day; });
      var maxDate = d3.max($scope.forecastData, function(d){ return d.day; });
      console.log("minDate is " + minDate);
      console.log("maxDate is " + maxDate);

			// Declare Scales (don't forget to invert Y range)
      var y = d3.scale.linear()
        .domain([minTemp,maxTemp])
        .range([height,0]);
      var x = d3.time.scale()
        .domain([minDate,maxDate])
        .range([0,width]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");


      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");


			var svg = d3.select($el[0]).append("svg")
      	.attr("width", "100%")
    		.attr("height", 500)
    		.attr("style", "background: #f4f4f4");

		  // Declare margin object (adds buffer)
      var margin = {left:50,right:50,top:40,bottom:0};

      // Add all elements into group
      var chartGroup = svg.append("g")
        .attr("transform", "translate("+margin.left+","+margin.top+")");

		  var line = d3.svg.line()
        .x(function(d){ return x(d.day); })
        .y(function(d){ return y(d.temp); })
        .interpolate("cardinal");


      // Finally add line; Append the path to group; run line generator on data
      chartGroup.append("path")
      .attr("stroke", "blue")
      .attr("d",line($scope.forecastData));

      // Add axes (shift x-axis down)
      chartGroup.append("g").attr("class", "x axis")
      .attr("transform", "translate(0, "+height+")").call(xAxis);
      chartGroup.append("g").attr("class", "y axis").call(yAxis);

      // circles
      chartGroup.selectAll("circle")
        .data($scope.forecastData)
        .enter().append("circle")
          .attr("class",function(d,i){ return "grp"+i; })
          .attr("cx",function(d,i){ return x(d.day); })
          .attr("cy",function(d,i){ return y(d.temp); })
          .attr("r","2");
		});
	};

	return {
		restrict: "EA",
		template: '<div class="temperature"></div>',
		replace: true,
		link: link
	};

}]);