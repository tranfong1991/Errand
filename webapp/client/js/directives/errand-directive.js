app.directive('errand', function(){
	return {
		'restrict': 'E',
		'scope': {
			'info': '='
		},
		'templateUrl': 'js/directives/errand-directive.html'
	}
});