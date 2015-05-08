app.game = function () {

	app.spotArray = ['','','','','','','','',''];

	var clickedBlock;

	app.gameOver = false;

	app.hc;

	app.cc;

	app.goFirst = function (player) {
		app.firstMove = player;
		
		return player;
	}

	app.humanChoice = function (val) {
		app.hc = val;
		if (val === 'X') {
			app.cc = 'O';
		} else {
			app.cc = 'X';
		}
    if (app.firstMove === 'comp') {
			app.compMove(4);
		}
		return val;
	}

	app.humanMove = function (num) {
		app.placeMove(num, app.hc);
		if (app.checkWin()) {
			// app.lose();
		} else {
			app.compMove(app.comp.react(app.cc, app.hc));
		}
		return num;
	};

	app.compMove = function (num) {
    computerMove(num);
		if (app.checkWin()) {
		//	app.lose();
		}
		return num;
	};

	app.placeMove = function (num, letter) {
		app.spotArray.splice(num,1,letter);
		block = $('#' + (num));
		block.html(letter);
		return app.spotArray[num];
	}

	$('.game-block').on('click', function() {
		var block = $(this);
		var id = block.attr('id');
		if (app.spotArray[id] === 'X' || app.spotArray[id] === 'O') {
		} else {
			block.html(app.hc);
			console.log(block);
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

  function computerMove(num) {
      $('.game-blocker-checkbox').prop('checked', true);
    //  window.setTimeout(function() {
        app.placeMove(num, app.cc);
        $('.game-blocker-checkbox').prop('checked', false);
        styleOs();
       // app.checkWin()
      //}, 1000);
  }

  $('.choose-first li').on('click', function () {
    $('.checkbox-choice').prop('checked', true);
  });
  $('.legend li').on('click', function () {
    $('.checkbox-first').prop('checked', true);
  });

};


