app.factory('User', function($resource){
	return $resource('/api/users');
});
