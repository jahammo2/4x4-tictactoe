app.game = function () {

	app.spotArray = ['','','','','','','','',''];

	var clickedBlock;

	app.gameOver = false;

	app.hc;

	app.cc;

	app.humanChoice = function (val) {
		app.hc = val;
		if (val === 'X') {
			app.cc = 'O';
		} else {
			app.cc = 'X';
		}
		return val;
	}

	app.placeXMove = function (num) {
	    app.spotArray.splice(num,1,'X');
	    clickedBlock = num;
	    app.checkWin();
	    if (!app.gameOver) {
	    	app.counterWin();
	    }
	    return app.spotArray[num];
	}

	app.placeOMove = function (num) {
	    app.spotArray.splice(num,1,'O');
	    clickedBlock = num;
	    block = $('#' + (num + 1));
	    block.html('O');
	    app.checkWin();
	    return app.spotArray[num];
	}

	$('.game-block').on('click', function() {
		var block = $(this);
		block.html(app.hc);
	    app.placeXMove(block.attr('id') - 1);
	});

	var blocks = $('.game-block');

	function styleOs() {
	    for (var i = blocks.length - 1; i >= 0; i--) {
	        if (blocks[i].innerHTML === 'O') {
	            blocks[i].style.paddingRight = 2 + '%'
	            blocks[i].style.paddingLeft = 0 + '%'
	        }
	    };
	}






};

app.game();

