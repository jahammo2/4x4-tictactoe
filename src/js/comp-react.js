app.counterWin = function () {
	var arr = app.spotArray;
	if (arr[0] === 'X' && arr[1] === 'X') {
		app.placeOMove(2);
		console.log(app.spotArray);
	}

	return false;
};


















