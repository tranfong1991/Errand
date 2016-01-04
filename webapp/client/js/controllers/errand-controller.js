app.controller('errandController', ['$scope', '$http', 'Errand', 'Search',
	function($scope, $http, Errand, Search){
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

	//call when the first time the page load to retrieve errands from server
	$scope.pageChanged();

	$scope.login = function(){
		$('#login').css('display', 'none');
		$('#user').css('display', 'block');
		FB.login(function(response){
			if(response.status === "connected"){
				console.log("logged in");
			}
		});
	};

	$scope.logout = function(){
		$('#login').css('display', 'block');
		$('#user').css('display', 'none');
		FB.logout(function(response){
			console.log("logged out")
		});
	};
}]);
