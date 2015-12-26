app.controller('errandController', ['$scope', 'Errand', function($scope, Errand){
	$scope.errands = [];

	//use get() instead of query() because query() expects an array, but result is an object
	Errand.get(function(result){
		$scope.errands = result.docs;
	});
}]);