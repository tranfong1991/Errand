//fit string in a limited space by only display 10 characters
app.filter('descFit', function(){
	return function(input){
		if(input.length > 30)
			input = input.substring(0, 30) + "...";
		return input;
	}
});

app.filter('nameFit', function(){
	return function(input){
		if(input.length > 20)
			input = input.substring(0, 20) + "...";
		return input;
	}
});

//turn JSON date to readable date string
app.filter('toDate', function(){
    return function(input){
	var date = new Date(input);
	return date.toString();
    }
});
