app.controller('errandController', ['$scope', 'Errand', '$http', function($scope, Errand, $http){
    $scope.errands = [];
    $scope.location = {};

    $scope.pageChanged = function(){
	//use get() instead of query() because query() expects an array, but result is an object
	Errand.get({
	    page: $scope.currentPage,
	    location: $scope.location.city
	}, function(result){
	    $scope.errands = result.docs;

	    //setup pagination information
	    $scope.totalItems = result.total;
	    $scope.currentPage = result.page;
	    $scope.maxSize = result.pages;
	    $scope.itemsPerPage = result.limit;
	});
    };

    $scope.getLocation = function(){
	//ip-api is used to get location given an IP address
	$http.get('http://ip-api.com/json/' + ip)
	.then(function(res){
	    if(res.data.status === 'success'){
		$scope.location = res.data;

		//only called when location is known
		$scope.pageChanged();
	    }
	    else $scope.location = "unknown";
	});
    }
    
    //called when the page finished loading to retrieve location based on client IP.
    $scope.getLocation();

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
