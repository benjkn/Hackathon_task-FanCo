app.factory('service', ['$http', function($http) {
	hello = {
		marta: function () {
			console.log('lalala')
		}
	}

	return hello
}])