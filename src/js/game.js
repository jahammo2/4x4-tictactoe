app.game = function () {

	app.spotArray = ['','','','','','','','',''];

	var clickedBlock;

	app.gameOver = false;

	app.hc;

	app.cc;

	app.goFirst = function (player) {
		app.firstMove = player;
		if (player === 'comp') {
			app.compMove(4);
		}
		return player;
	}

	app.humanChoice = function (val) {
		app.hc = val;
		if (val === 'X') {
			app.cc = 'O';
		} else {
			app.cc = 'X';
		}
		return val;
	}

	app.humanMove = function (num) {
		app.placeMove(num, app.hc);
		if (app.checkWin()) {
			app.lose();
		} else {
			app.compMove(app.comp.react(app.cc, app.hc));
		}
		return num;
	};

	app.compMove = function (num) {
		app.placeMove(num, app.cc);
		if (app.checkWin()) {
			app.lose();
		}
		return num;
	};

	app.placeMove = function (num, letter) {
		app.spotArray.splice(num,1,letter);
		block = $('#' + (num + 1));
		block.html(letter);
		return app.spotArray[num];
	}

	$('.game-block').on('click', function() {
		var block = $(this);
		var id = block.attr('id');
		if (app.spotArray[id] === 'X' || app.spotArray[id] === 'O') {
			console.log('cannot');
		} else {
			block.html(app.hc);
	    	app.humanMove(id);
		}
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

	app.checkArrAmounts = function () {
		var amt = 0;
		for (var i = app.spotArray.length - 1; i >= 0; i--) {
			if (app.spotArray[i] === 'X' || app.spotArray[i] === 'O') {
				amt ++;
			}
		};
		return amt;
	}




};

app.game();

