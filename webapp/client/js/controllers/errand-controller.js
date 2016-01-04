app.controller('errandController', ['$scope', 'Errand', 'Authentication', function($scope, Errand, Auth){
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
	FB.login(function(response){
	    if(response.status === "connected"){
		console.log("Logged in");
	    }
	});
    };

    $scope.logout = function(){
	FB.logout(function(response){
	    console.log("Logged out")
	});
    };
}]);
