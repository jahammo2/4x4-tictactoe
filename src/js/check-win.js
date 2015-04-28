app.checkWin = function (num1, num2, num3) {
	function arr (i) {
		return app.spotArray[i];
	}
	console.log(arr(num1))
	console.log(arr(num2))
	console.log(arr(num3))

	if (arr(num1) === arr(num2) && arr(num2) === arr(num3)) {
		console.log('yes');
		return true;
	}
};