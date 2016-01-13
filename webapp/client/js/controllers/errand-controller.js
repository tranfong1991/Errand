app.controller('errandController', ['$scope', '$rootScope', 'Errand', 'User', '$http', function($scope, $rootScope, Errand, User, $http){
    const HTTP_OK = 200;
    const HTTP_CREATED = 201;
    const HTTP_NOT_FOUND = 404;

    $scope.errands = [];
    $scope.currentLocation = {};

    $scope.pageChanged = function(){
	//use get() instead of query() because query() expects an array, but result is an object
	Errand.get({
	    page: $scope.currentPage,
	    location: $scope.currentLocation.city
	}, function(result){
	    $scope.errands = result.docs;

	    //setup pagination information
	    $scope.totalItems = result.total;
	    $scope.currentPage = result.page;
	    $scope.maxSize = result.pages;
	    $scope.itemsPerPage = result.limit;
	});
    };

    $scope.getCurrentLocation = function(){
	//ip-api is used to get location given an IP address
	$http.get('http://ip-api.com/json/' + ip)
	.then(function(res){
	    if(res.data.status === 'success'){
		$scope.currentLocation = res.data;

		//only called when location is known
		$scope.pageChanged();
	    }
	    else $scope.currentLocation = "unknown";
	});
    }
    
    //called when the page finished loading to retrieve location based on client IP.
    $scope.getCurrentLocation();

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

    $scope.submit = function(){
	//put customerId in errand json in order for the server to find its _id
	$scope.errand.customerId = $rootScope.user.id;
	Errand.save($scope.errand, function(res){
	    //if a new errand is created, add its _id to the current user's errands_listed array
	    if(res.status === HTTP_CREATED)
		User.modifyErrandsList({id: $rootScope.user.id}, {
		    method:'add',
		    
		    //use 'data' field so that in the server side code, it can get what is inside it entirely instead of eliminate 'method' field
		    data:{
			errands_listed: res.object_id
		    }
		});
	});
    }

    $scope.cancel = function(){
	$scope.errand = {};  //if $scope.errand is not made empty, even the fields are empty, it still keeps its previous values	
	$('#description').val("");
	$('#location').val("");
	$('#compensation').val("");
	$('#finish-by').val("");
    }
}]);
