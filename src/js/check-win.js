app.checkWin = function () {
	function arr (i) {
		return app.spotArray[i];
	}

	function checkThree(num, param) {
        var idNum = app.spotArray[num];
        var idNumLess = app.spotArray[num - param];
        var idNumMore = app.spotArray[num + param];
        if ((idNum === idNumLess) && (idNum === idNumMore) && (idNum !== '')) {
            function changeColor(el) {
                el.css({
                    'background': 'white',
                    'color': '#EB1767'
                });
            };
            num += 1;
            changeColor($('#' + num));
            changeColor($('#' + (num - param)));
            changeColor($('#' + (num + param)));
            return true;
        }
    }

    if (checkThree(1, 1) || checkThree(4, 1) || checkThree(7, 1) || checkThree(3, 3) || checkThree(4, 1) || checkThree(4, 3) || checkThree(7, 3) || checkThree(4, 4) || checkThree(4, 2)) {
        // game end functionality
        return true;
    } else {
    	return false;
    }

};

app.emptyArray = function () {
	app.spotArray = ['','','','','','','','',''];
}