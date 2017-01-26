app.controller('DonutCtrl', ['sales', '$scope', function (sales, $scope) {
    var moneyFormat = d3.format(",.2f");

    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 520,
            donut: true,
            x: function (d) { return d.key; },
            y: function (d) { return d.values; },
            showLabels: true,
            color:['#388E3C','#81C784','#F57C00','#FFB74D','#D32F2F','#E57373'],
            // controls pie angle
            // pie: {
            //     startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2 },
            //     endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2 }
            // },
            duration: 500,
            legend: {
                margin: {
                    top: 5,
                    right: 20,
                    bottom: 5,
                    left: 0

                }
            }
        }
    };


    $scope.salesData = [];

    sales.getSales().then(function (response) {
        $scope.salesData = response.data;

        sales.getPrice().then(function (prices) {
            price = prices.data;

            for (a = 0; a < $scope.salesData.length; a++) {
                for (b = 0; b < price.length; b++) {
                    if ($scope.salesData[a].SKU === price[b].SKU && $scope.salesData[a].Channel === price[b].Channel) {
                        uniquePrice = price[b].RevenuePerUnitSold;
                    }
                }
                $scope.salesData[a].revenue = $scope.salesData[a].SalesUnits * uniquePrice
            }
            // console.log($scope.salesData);

            //Nest + Rollup for Total Sales
            var revenueData = d3.nest()
                .key(function (d) { return (d.SKU); }).sortKeys(d3.ascending)
                .key(function (d) { return (d.Channel); }).sortKeys(d3.ascending)
                .rollup(function (d) {
                    return d3.sum(d, function (g) {
                        return g.revenue;
                    });
                }).entries($scope.salesData);


            totalRevenue = 0;
            revenueData.forEach(function(d){
                totalRevenue += d.values;
            });

            $scope.data = [];

            for (i=0; i<revenueData.length; i++) {
                var j = i*2
                $scope.data[j] = {}
                $scope.data[j].key = revenueData[i].key.split(' ', 1) + ' - ' + revenueData[i].values[0].key
                $scope.data[j].values = revenueData[i].values[0].values

                $scope.data[j+1] = {}
                $scope.data[j+1].key = revenueData[i].key.split(' ', 1) + ' - ' + revenueData[i].values[1].key
                $scope.data[j+1].values = revenueData[i].values[1].values
            }


        });
    });

}]);
