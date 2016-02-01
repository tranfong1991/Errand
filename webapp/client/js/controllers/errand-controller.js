app.controller('errandController', ['$scope', '$rootScope', 'Errand', 'User', '$http', function($scope, $rootScope, Errand, User, $http){
    $scope.errands = result.docs;
    $scope.totalItems = result.total;
    $scope.currentPage = result.page;
    $scope.maxSize = result.pages;
    $scope.itemsPerPage = result.limit;
    $scope.currentLocation = currentLocation;

    $scope.pageChanged = function(){
	//use get() instead of query() because query() expects an array, but result is an object
	Errand.get({
	    page: $scope.currentPage,
	    location: $scope.currentLocation.city,
	    fields: 'customer description compensation'
	}, function(result){
	    $scope.errands = result.docs;

	    //setup pagination information
	    $scope.totalItems = result.total;
	    $scope.currentPage = result.page;
	    $scope.maxSize = result.pages;
	    $scope.itemsPerPage = result.limit;
	});
    };
}]);
