var app = angular.module('ErrandApp', ['ngResource', 'ui.bootstrap', 'ngRoute']);

// app.config(['$routeProvider', function($routeProvider){
//   $routeProvider
//     .when('/', {
//       templateUrl: 'partials/home.html',
//     })
//     .when('/main', {
//       controller: 'js/controllers/errand-controller.js',
//       templateUrl: 'partials/main.html'
//     })
//     .otherwise({
//       redirectTo: '/'
//     });
// }]);

//run() is executed when the injector is done loading all modules
app.run(['$rootScope', '$window', 'Authentication', function($rootScope, $window, auth){
    
    $rootScope.user = {};

    $window.fbAsyncInit = function() {
	FB.init({
            appId      : '431794573679228',
            cookie     : true,  // enable cookies to allow the server to access the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.2' // use version 2.2
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
