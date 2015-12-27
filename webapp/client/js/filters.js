//fit string in a limited space by only display 10 characters
app.filter('fit', function(){
	return function(input){
		if(input.length > 15)
			input = input.substring(0, 15) + "...";
		return input;
	}
});
