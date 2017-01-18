app.controller('DonutCtrl', ['sales', '$scope', function (sales, $scope) {
    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 520,
            donut: true,
            x: 
            function (d) { return d.x; },
            // function (d) {
            //     // console.log(d);
            //     d.values.forEach(function(v) {
            //         return v.key;
            //     })
            // },
            y: 
            function (d) { return d.y; },
            // function (d) {
            //     console.log(d);
            //     d.values.forEach(function(v) {
            //         return v.values;
            //     })
            // },
            showLabels: true,
            color:['#388E3C','#81C784','#F57C00','#FFB74D','#D32F2F','#E57373'],

            // pie: {
            //     startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2 },
            //     endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2 }
            // },
            duration: 500,
            legend: {
                margin: {
                    top: 5,
                    right: 70,
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

            console.log(revenueData);

            //     totalRevenue = 0;
            // revenueData.forEach(function(d){
            //     totalRevenue += d.values;
            // });

            // console.log(totalRevenue);

            // hardcoded :(
            $scope.data = 
            [
                {
                    x: 'Green-Direct',
                    y: 721306.4100000003
                },
                {
                    x: 'Green-Retail',
                    y: 594510.2599999999
                },
                {
                    x: 'Orange-Direct',
                    y: 460176.2
                },
                {
                    x: 'Orange-Retail',
                    y: 732847.5399999999
                },
                {
                    x: 'Red-Direct',
                    y: 344500.18
                },
                {
                    x: 'Red-Retail',
                    y: 1068884.2799999993
                },

            ];
            // $scope.data = revenueData;




        });
    });

}]);
