app.directive("linearChart", [ 'sales', function(sales) {

  var link = function($scope, $el, $attrs){

    $scope.salesData = [];

		sales.getSales().then(function(response){
      $scope.salesData = response.data;
      console.log($scope.salesData);

  		//Nest + Rollup for Total Sales
      var totalData = d3.nest()
			.key(function(d){ return (d.WeekOf); }).sortKeys(d3.ascending)
			.rollup(function(d){
				return d3.sum(d, function(g){
				  return g.SalesUnits;
				});
			}).entries($scope.salesData);
			console.log(totalData);


  		// parse the date!
      var parseDate = d3.time.format("%Y-%m-%d").parse;
  		for ( i=0; i<totalData.length; i++) {
        totalData[i].key = parseDate(totalData[i].key);
  		};
  		console.log(totalData[0]);


      // Declare height and width variables(pixels)
      var height = 300;
      var width = 1000;
      // total = 0;
      // Work out extremes
      var maxSales = d3.max(totalData,function(d,i){
        return d.values;
      });
      console.log("Max Sales for a day is: " + maxSales);

      // find max value day
      for ( i=0; i<totalData.length; i++) {
        if (totalData[i].values === maxSales){
          console.log("most shit sold on " + totalData[i].key);
        };
      };

      var minDate = d3.min(totalData,function(d){ return d.key; });
      var maxDate = d3.max(totalData, function(d){ return d.key; });
      console.log("minDate is " + minDate);
      console.log("maxDate is " + maxDate);

			// Declare Scales (don't forget to invert Y range)
      var y = d3.scale.linear()
        .domain([0,maxSales])
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
        .x(function(d){ return x(d.key); })
        .y(function(d){ return y(d.values); })
        .interpolate("cardinal");

      // Finally add line; Append the path to group; run line generator on data
      chartGroup.append("path").attr("d",line(totalData));

      // Add axes (shift x-axis down)
      chartGroup.append("g").attr("class", "x axis")
      .attr("transform", "translate(0, "+height+")").call(xAxis);
      chartGroup.append("g").attr("class", "y axis").call(yAxis);

      // circles
      chartGroup.selectAll("circle")
        .data(totalData)
        .enter().append("circle")
          .attr("class",function(d,i){ return "grp"+i; })
          .attr("cx",function(d,i){ return x(d.key); })
          .attr("cy",function(d,i){ return y(d.values); })
          .attr("r","2");
		});
	}

	return {
		restrict: "EA",
		template: '<div class="fuck"</div>',
		replace: true,
		link: link
	};

}]);