app.controller('errandController', ['$scope', 'Errand', function($scope, Errand){
	$scope.errands = [];

	$scope.pageChanged = function(){
		//use get() instead of query() because query() expects an array, but result is an object
		Errand.get({page: $scope.currentPage}, function(result){
			$scope.errands = result.docs;

			//setup pagination information
			$scope.totalItems = result.total;
			$scope.currentPage = result.page;
			$scope.maxSize = result.pages;
			$scope.itemsPerPage = result.limit;
		});
	};

	$scope.logout = function(){
	    FB.logout(function(response){
	        window.location.href = '/';
	    });
	    return false;
	}

	//call when the first time the page load to retrieve errands from server
	$scope.pageChanged();
}]);