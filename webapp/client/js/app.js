var app = angular.module('ErrandApp', ['ngResource', 'ui.bootstrap']);

//run() is executed when the injector is done loading all modules
app.run(['$rootScope', '$window', 'Errand', 'User', 'Authentication', function($rootScope, $window, Errand, User, auth){
    const HTTP_OK = 200;
    const HTTP_CREATED = 201;
    const HTTP_NOT_FOUND = 404;
    
    $rootScope.user = {};

    $rootScope.login = function(){
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

    $rootScope.logout = function(){
	FB.logout(function(response){
	    console.log("Logged out")
	});
    };

    $rootScope.submit = function(){
	//put customerId in errand json in order for the server to find its _id
	$rootScope.errand.customerId = $rootScope.user.id;

	Errand.save($rootScope.errand, function(res){
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

    $rootScope.cancel = function(){
	$rootScope.errand = {};  //if $rootScope.errand is not made empty, even the fields are empty, it still keeps its previous values	
	$('#description').val("");
	$('#location').val("");
	$('#compensation').val("");
	$('#finish-by').val("");
    }

    $rootScope.getErrandInfo = function(id){
	Errand.get({id: id}, function(result){
	    $rootScope.selectedErrand = result;
	    if(result.is_taken)
		$rootScope.buttonText = 'Untake Errand';
	    else $rootScope.buttonText = 'Take Errand'
	});
    }

    $rootScope.errandAction = function(){
	var errandId = $rootScope.selectedErrand._id;

	if(! $rootScope.selectedErrand.is_taken){
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

    $window.fbAsyncInit = function() {
	FB.init({
            appId      : '431794573679228',
            cookie     : true,  // enable cookies to allow the server to access the session
            xfbml      : true,  // parse social plugins on this page
	    status     : true,
            version   : 'v2.2' // use version 2.2
	});
	auth.watchAuthStatusChange();
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}]);
