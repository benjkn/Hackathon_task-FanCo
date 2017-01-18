app.controller('BarCtrl', ['$scope', 'sales', function ($scope, sales) {
  console.log('barctrl')
  $scope.options = {
    chart: {
      type: 'multiBarChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 45,
        left: 45
      },
      clipEdge: true,
      duration: 500,
      stacked: true,
      xAxis: {
        axisLabel: 'Dates ',
        showMaxMin: false,
        tickFormat: function (d) {
          return d3.format(',f')(d);
        }
      },
      yAxis: {
        axisLabel: 'Revenue ($)',
        axisLabelDistance: -20,
        tickFormat: function (d) {
          return d3.format(',.1f')(d);
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


      // $scope.data = [];
      // $scope.data = revenueData;








      $scope.data = generateData;

      /* Random Data Generator (took from nvd3.org) */
      function generateData() {
          return stream_layers(3,50+Math.random()*50,.1).map(function(data, i) {
              return {
                  key: 'Stream' + i,
                  values: data
              };
          });
      }

      /* Inspired by Lee Byron's test data generator. */
      function stream_layers(n, m, o) {
          if (arguments.length < 3) o = 0;
          function bump(a) {
              var x = 1 / (.1 + Math.random()),
                  y = 2 * Math.random() - .5,
                  z = 10 / (.1 + Math.random());
              for (var i = 0; i < m; i++) {
                  var w = (i / m - y) * z;
                  a[i] += x * Math.exp(-w * w);
              }
          }
          return d3.range(n).map(function() {
              var a = [], i;
              for (i = 0; i < m; i++) a[i] = o + o * Math.random();
              for (i = 0; i < 5; i++) bump(a);
              return a.map(stream_index);
          });
      }

      /* Another layer generator using gamma distributions. */
      function stream_waves(n, m) {
          return d3.range(n).map(function(i) {
              return d3.range(m).map(function(j) {
                  var x = 20 * j / m - i / 3;
                  return 2 * x * Math.exp(-.5 * x);
              }).map(stream_index);
          });
      }

      function stream_index(d, i) {
          return {x: i, y: Math.max(0, d)};
      }

    });
  });
}]);
