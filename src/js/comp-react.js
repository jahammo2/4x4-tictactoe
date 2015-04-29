app.counterWin = function () {
	var arr = app.spotArray;
	if (arr[0] === 'X' && arr[1] === 'X') {
		console.log('worked');
		app.placeOMove(2);
	}

	return false;
};


















