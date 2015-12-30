app.factory('Errand', function($resource){
	return $resource('/api/errands');
});
