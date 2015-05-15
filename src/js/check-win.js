app.checkWin = function () {
	function arr (i) {
		return app.spotArray[i];
	}

	function checkThree(num, param) {
        var idNum = app.spotArray[num];
        var idNum1 = app.spotArray[num - param];
        var idNum2 = app.spotArray[num + param];
        var idNum3 = app.spotArray[num + (param * 2)];
        if ((idNum === idNum1 && idNum2 === idNum && idNum3 === idNum) && (idNum !== '')) {

            function changeColor(el) {
                el.css({
                    'background': 'white',
                    'color': '#EB1767'
                });
            };
            num += 1;
            changeColor($('#' + (num - 1)));
            changeColor($('#' + (num - param - 1)));
            changeColor($('#' + (num + param - 1)));
            changeColor($('#' + (num + (param * 2) - 1)));
            // app.lose();
            return true;
        }
    }

    if (checkThree(1, 1) || checkThree(5, 1) || checkThree(9, 1) || checkThree(13, 1) || checkThree(4, 4) || checkThree(5, 4) || checkThree(6, 4) || checkThree(7, 4) || checkThree(5, 5) || checkThree(6, 3)) {
        // game end functionality
        app.gameOver = true;
        return true;
    } else if (checkBlocks()) {
        app.catScan();
        return false;
    } else {
    	return false;
    }
    function checkBlocks() {
        var counter = 0;
        for (var i = app.spotArray.length - 1; i >= 0; i--) {
            if (app.spotArray[i] !== '') {
                counter += 1;
            }
        };
        if (counter === 16) {
            return true;
        } else {
            return false;
        }
    }



};

app.emptyArray = function () {
	app.spotArray = ['','','','','','','','','','','','','','','',''];
}
