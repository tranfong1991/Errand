app.controller('errandController', ['$scope', '$rootScope', 'Errand', 'User', '$http', function($scope, $rootScope, Errand, User, $http){
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
		//check $rootScope.user every 500ms to see if it's populated before posting it to the server
		var intervalId = setInterval(function(){
		    if(!jQuery.isEmptyObject($rootScope.user)){
			User.save({
			    id: $rootScope.user.id,
			    name: $rootScope.user.name,
			    profile_pic_url: $rootScope.user.picture.data.url,
			    contact_info: [$rootScope.user.email]
			});
			clearInterval(intervalId);
		    }
		}, 500);
		console.log("Logged in");
	    }
	}, {scope: 'email'});
    };

    $scope.logout = function(){
	FB.logout(function(response){
	    console.log("Logged out")
	});
    };
}]);
