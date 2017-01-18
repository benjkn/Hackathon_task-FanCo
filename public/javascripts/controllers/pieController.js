app.controller('PieCtrl', ['sales', '$scope', function (sales, $scope) {

    var moneyFormat = d3.format(",.2f");

    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function (d) { return d.key; },
            y: function (d) { return d.values; },
            showLabels: true,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };


    $scope.salesData = [];

    sales.getSales(1).then(function (response) {
        $scope.salesData = response.data;

        sales.getPrice().then(function (prices) {
            price = prices.data;

            for (a = 0; a < $scope.salesData.length; a++) {
                for (b = 0; b < price.length; b++) {
                    if ($scope.salesData[a].SKU === price[b].SKU && $scope.salesData[a].Channel === price[b].Channel) {
                        uniquePrice = price[b].RevenuePerUnitSold;
                    }
                }
                $scope.salesData[a].revenue = $scope.salesData[a].SalesUnits * uniquePrice;
            }
            // console.log($scope.salesData);

            //Nest + Rollup for Total Sales
            var revenueData = d3.nest()
                .key(function (d) { return (d.Neighborhood); }).sortKeys(d3.ascending)
                .rollup(function (d) {
                    return d3.sum(d, function (g) {
                        return g.revenue;
                    });
                }).entries($scope.salesData);

            // console.log(revenueData);

            totalRevenue = 0;
            revenueData.forEach(function (d) {
                totalRevenue += d.values;
            });

            // console.log(totalRevenue);


            $scope.data = [];
            $scope.data = revenueData;

            var margin = { top: 5, right: 35, bottom: 5, left: 0 }

            var element = document.getElementById('pi');
            // console.log(element);
            var positionInfo = element.getBoundingClientRect();
            // console.log(positionInfo);
            var height = positionInfo.height;
            var width = positionInfo.width;


            var svg = d3.select("#pi");

            // Revenue
            svg.append("text")
                .attr("x", 4)
                .attr("y", -20)
                .attr("class", "revenueTitle")
                .style("fill", "steelblue")
                .style("font-weight", "bold")
                .text("2015-2016 - Total Revenue: $" + moneyFormat(totalRevenue));



        });
    });

}]);
