app.directive('googlePlaces', function(){
    return {
	require: 'ngModel',
	link: function($scope, element){
	    var options = {
		types: ['(cities)']
	    };

	    var autocomplete = new google.maps.places.Autocomplete($('#location')[0], options);

	    //register event to assign location value to errand object when user chooses one of the locations in the dropdown list
	    google.maps.event.addListener(autocomplete, 'place_changed', function() {
		$scope.$apply(function() {
                    $scope.errand.location = element.val();                
                });
            }); 
	}
    };
});
