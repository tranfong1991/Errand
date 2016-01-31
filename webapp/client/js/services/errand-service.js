app.factory('Errand', function($resource){
	return $resource('/api/errands/:id', null, {
	    take:{
		method: 'PUT',
		url: '/api/errands/:id/take'
	    },
	    untake:{
		method: 'DELETE',
		url: '/api/errands/:id/take'
	    },
	    search:{
		method: 'GET',
		url: 'api/search'
	    }
	});
});
