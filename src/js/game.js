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
		block.html(app.hc);
	    app.humanMove(block.attr('id'));
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

