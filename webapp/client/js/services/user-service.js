app.factory('User', function($resource){
	return $resource('/api/users/:id', null, {
	    modifyErrandsList: {
		method: 'PUT',
		url: '/api/users/:id/errands' //override url
	    }
	});
});
