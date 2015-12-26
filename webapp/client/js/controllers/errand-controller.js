app.controller('errandController', ['$scope', function($scope){
	$scope.errands=[{
		'name':'Andy Tran',
		'profilePicUrl':'https://lh5.googleusercontent.com/-ZadaXoUTBfs/AAAAAAAAAAI/AAAAAAAAAGA/19US52OmBqc/photo.jpg',
		'description':'go to macdonald and one big mac',
		'compensation': 7.99
	},
	{
		'name':'Andy Tran',
		'profilePicUrl':'http://www.realtimearts.net/data/images/art/46/4640_profile_nilssonpolias.jpg',
		'description':'mcdonald',
		'compensation': 10.00
	}];
}]);