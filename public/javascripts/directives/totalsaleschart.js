app.directive("linearChart", [ 'sales', function(sales) {

  var link = function($scope, $el, $attrs) {

    $scope.salesData = [];
    $scope.weatherData = [];
    // console.log('hello there')

		sales.getSales().then (function(response) {
      // console.log($scope.salesData);
      $scope.salesData = response.data;

      sales.getPrice().then (function(prices) {
        price = prices.data;

      for (a=0; a<$scope.salesData.length; a++) {
        for (b=0; b<price.length; b++) {
          if ($scope.salesData[a].SKU === price[b].SKU && $scope.salesData[a].Channel === price[b].Channel) {
            uniquePrice = price[b].RevenuePerUnitSold;
          }
        }
        $scope.salesData[a].revenue = $scope.salesData[a].SalesUnits * uniquePrice
      }
        // console.log ($scope.salesData);



      sales.getRawHistory().then(function(response){
      $scope.weatherData = response.data;
      weatherData = $scope.weatherData.splice(0,358);

      //nest
        var totalData = d3.nest()
        .key(function(d){ return (d.WeekOf); }).sortKeys(d3.ascending)
        .rollup(function(d){
          return d3.sum(d, function(g){
            return g.SalesUnits;
          });
        }).entries($scope.salesData);



  		// parse the dates!
      var parseDate = d3.time.format("%Y-%m-%d").parse;
      // for the tooltip dates
      var formatTime = d3.time.format("%e %b");


      for ( i=0; i<totalData.length; i++) {
        totalData[i].key = parseDate(totalData[i].key);
  		}

       weatherData.forEach(function(d){
        d.date = parseDate(d.date);
        d.maxtempC = +d.maxtempC;
      })



      // Declare height and width variables(pixels)
      var height = 300;
      var width = 800;
      // total = 0;
      // Work out extremes
      var maxSales = d3.max(totalData,function(d,i){
        return d.values;
      });

      var maxHigh = d3.max(weatherData, function(d,i){
        return d.maxtempC;
      });

      var minHigh = d3.min(weatherData, function(d,i){
        return d.maxtempC;
      });

      // console.log(maxHigh);
      // console.log(minHigh);

      // find max temp day
      // for ( i=0; i<weatherData.length; i++) {
      //   if (weatherData[i].maxtempC === maxHigh){
          // console.log(weatherData[i]);
      //   }
      // }

      var minDate = d3.min(totalData,function(d){ return d.key; });
      var maxDate = d3.max(totalData, function(d){ return d.key; });

      var minDate2 = d3.min($scope.weatherData,function(d){ return d.date; });
      var maxDate2 = d3.max($scope.weatherData, function(d){ return d.date; });
      // console.log(minDate);
      // console.log(minDate2);
      // console.log("Max Sales for a day is: " + maxSales);

      // // find max value day
      // for ( i=0; i<totalData.length; i++) {
      //   if (totalData[i].values === maxSales){
      //     // console.log("most shit sold on " + totalData[i].key);
      //   }
      // }

      var minDate = d3.min(totalData,function(d){ return d.key; });
      var maxDate = d3.max(totalData, function(d){ return d.key; });
      // console.log("minDate is " + minDate);
      // console.log("maxDate is " + maxDate);


			// Declare Scales + axes (don't forget to invert Y range)
      var y = d3.scale.linear()
        .domain([0,maxSales])
        .range([height,0]);

      var y2 = d3.scale.linear()
        .domain([-15, maxHigh])
        .range([height,0])

      var x = d3.time.scale()
        .domain([minDate,maxDate])
        .range([0,width]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%b %y'"));

      var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(5)
        .orient("left");

      var yAxis2 = d3.svg.axis()
        .scale(y2)
        .ticks(12)
        .orient("right");


			var svg = d3.select($el[0]).append("svg")
      	.attr("width", "100%")
    		.attr("height", height + 100)
    		.attr("style", "background: #f4f4f4");

		  // Declare margin object (adds buffer)
      var margin = {left:80,right:50,top:40,bottom:0};

      // Add all elements into group
      var chartGroup = svg.append("g")
        .attr("transform", "translate("+margin.left+","+margin.top+")");

		  var line = d3.svg.line()
        .x(function(d){ return x(d.key); })
        .y(function(d){ return y(d.values); })
        .interpolate("cardinal");

      var line2 = d3.svg.line()
        .x(function(d){ return x(d.date); })
        .y(function(d){ return y2(d.maxtempC); })
        .interpolate("step");

      // line colors
      salesColor = "steelblue";
      weatherColor = "#26A69A"



      // Finally add line; Append the path to group; run line generator on data
      chartGroup.append("path").attr("d",line(totalData))
        .attr("class", "sales")
        .style("stroke", salesColor)
        .style("fill", "none")
        .style("stroke-width", "1.5px");

      // Weather Line
      chartGroup.append("path").attr("d",line2(weatherData))
        .attr("class", "weather")
        .style("stroke", weatherColor)
        .style("opacity", 0.5)
        .style("fill", "none")
        .style("stroke-width", "1.5px");

      // Add axes to group (shift x-axis down)
      chartGroup.append("g").attr("class", "x axis")
      .attr("transform", "translate(0, "+height+")").call(xAxis)
      .selectAll("text")
          .attr("dx", "-0.9em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end");

      chartGroup.append("g").attr("class", "y axis").call(yAxis);

      // weather axis
      chartGroup.append("g").attr("class", "y2 axis")
      .attr("transform", "translate("+width+",0)").call(yAxis2);


      // Define the div for the tooltip
      var div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

      // circles + tooltips
      chartGroup.selectAll("circle")
        .data(totalData)
        .enter().append("circle")
          .attr("class",function(d,i){ return "grp"+i; })
          .attr("cx",function(d,i){ return x(d.key); })
          .attr("cy",function(d,i){ return y(d.values); })
          .attr("r","2.5")
          .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(formatTime(d.key) + "<br/>"  + d.values)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
          .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
          });


          // Text label for the Y axis
          svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("x", margin.top - (height / 2))
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Weekly Units Sold");



      // Text label for the right Y axis
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y",width+110)
        .attr("x", margin.top - (height / 2))
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temperature (°C)");


      // Legend

      // Units Sold
      svg.append("text")
        .attr("x", (width/2) + 100)
        .attr("y", margin.top)
        .attr("class", "legend")
        .style("fill", salesColor)
        .style("font-weight","bold")
        .text("Units Sold");

      svg.append("circle")
        .attr("cx", (width/2) + 90)
        .attr("cy", margin.top - 5)
        .style("fill", salesColor)
        .attr("r", "5");

      // Temperature (hardcoded..)
      svg.append("text")
        .attr("x", (width/2) + 200)
        .attr("y", margin.top)
        .attr("class", "legend")
        .style("fill", weatherColor)
        .style("font-weight","bold")
        .text("Temperature");

      svg.append("circle")
        .attr("cx", (width/2) + 190)
        .attr("cy", margin.top - 5)
        .style("fill", weatherColor)
        .attr("r", "5");

      }); // thisis closing getrawhistory
    }) // this is closing the getprices
		}); //this is closing the getsales
	}; //this is closing the var link



  return {
		restrict: "EA",
		template: '<div class="yay"></div>',
		replace: true,
		link: link
	};


}]);