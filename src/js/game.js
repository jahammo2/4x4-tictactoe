app.game = function () {

	app.spotArray = ['','','','','','','','',''];

	var clickedBlock;
console.log($('.game-block-1'))
console.log($('.choose-x'))
	app.gameOver = false;
console.log($('.game-block-1').text());
	app.hc;

	app.humanChoice = function (val) {
		console.log(val);
		app.hc = val;
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
	    console.log($('.game-block-1').text());
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

