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
            changeColor($('#' + (num - 1)));
            changeColor($('#' + (num - param - 1)));
            changeColor($('#' + (num + param - 1)));
            console.log('win');
            //app.lose();
            return true;
        }
    }

    if (checkThree(1, 1) || checkThree(4, 1) || checkThree(7, 1) || checkThree(3, 3) || checkThree(4, 1) || checkThree(4, 3) || checkThree(7, 3) || checkThree(4, 4) || checkThree(4, 2)) {
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
        if (counter === 9) {
            return true;
        } else {
            return false;
        }
    }



};

app.emptyArray = function () {
	app.spotArray = ['','','','','','','','',''];
}
