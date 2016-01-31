app.controller('errandController', ['$scope', '$rootScope', 'Errand', 'User', '$http', function($scope, $rootScope, Errand, User, $http){
    const HTTP_OK = 200;
    const HTTP_CREATED = 201;
    const HTTP_NOT_FOUND = 404;

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
		    method: 'add',
		    
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

    $scope.getErrandInfo = function(id){
	Errand.get({id: id}, function(result){
	    $scope.selectedErrand = result;
	    if(result.is_taken)
		$scope.buttonText = 'Untake Errand';
	    else $scope.buttonText = 'Take Errand'
	});
    }

    $scope.errandAction = function(){
	var errandId = $scope.selectedErrand._id;

	if(! $scope.selectedErrand.is_taken){
	    Errand.take({id: errandId},{runnerId: $rootScope.user.id}, function(response){
		//if errand is successfully taken, add errand id to runner's errands_taken list
		if(response.status === HTTP_OK){
		    User.modifyErrandsList({id: $rootScope.user.id}, {
			method: 'add',
			data:{
			    errands_taken: errandId
			}
		    });
		}
	    });
	} else {
	    Errand.untake({id: errandId}, null, function(response){
		if(response.status === HTTP_OK){
		    User.modifyErrandsList({id: $rootScope.user.id}, {
			method: 'remove',
			data:{
			    errands_taken: errandId
			}
		    });
		}
	    });
	}
    }
}]);
