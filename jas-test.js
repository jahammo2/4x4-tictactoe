describe("game", function() {
  var customMatcher = {
    toMatchEitherNumber: function () {
      return {
        compare: function (actual, expected, expected2) {
          result = {};
          if ((actual === expected) || (actual === expected2)) {
            result.pass = true;
          } else {
            result.pass = false;
          }
          return result;
        }
      }
    }
  }

	beforeEach(function () {
		app.emptyArray();
		app.gameOver = false;
		app.hc = 'X';
		app.cc = 'O';
    app.game();
    jasmine.addMatchers(customMatcher);
	});

	describe('see if a move was placed', function() {
		it('X move was made on the top left corner', function() {
			expect(app.placeMove(0, 'X')).toBe('X');
			expect(app.spotArray[0]).toBe('X');
		});

		it('O move was made on the top left corner', function() {
			expect(app.placeMove(0, 'O')).toBe('O');
			expect(app.spotArray[0]).toBe('O');
		});

		it('X move was made on the bottom middle', function() {
			expect(app.placeMove(7, 'X')).toBe('X');
			expect(app.spotArray[7]).toBe('X');
		});

		it('O move was made on the bottom middle', function() {
			expect(app.placeMove(7, 'O')).toBe('O');
			expect(app.spotArray[7]).toBe('O');
		});
	});

	describe("creating a move", function() {
	    it("on click of top right, a piece was filled", function() {
		    $('.game-block-2').click();
		    console.log(app.spotArray);
		    expect(app.spotArray[2]).not.toBe('');
	    });

	    it("on click of center left, a piece was filled", function() {
		    $('.game-block-3').click();
		    expect(app.spotArray[3]).not.toBe('');
	    });
	});

	describe("see if a row matches", function() {
	    it("the first row has 3 x's", function() {
	    	app.placeMove(0, 'X');
	    	app.placeMove(1, 'X');
	    	app.placeMove(2, 'X');
        app.placeMove(3, 'X');
	    	expect(app.checkWin()).toBeTruthy();
	    });

	    it("if there are 3 X's but not in a row, it should return falsy", function() {
	    	app.placeMove(0, 'X');
	    	app.placeMove(1, 'X');
	    	app.placeMove(4, 'X');
        app.placeMove(7, 'X');
	    	expect(app.checkWin()).toBeFalsy();
	    });

	    it("the first column has 3 x's", function() {
	    	app.placeMove(0, 'X');
	    	app.placeMove(4, 'X');
	    	app.placeMove(8, 'X');
        app.placeMove(12, 'X');
	    	expect(app.checkWin()).toBeTruthy();
	    });

	    it("the first diagonal has 3 x's", function() {
	    	app.placeMove(0, 'X');
	    	app.placeMove(5, 'X');
	    	app.placeMove(10, 'X');
        app.placeMove(15, 'X');
	    	expect(app.checkWin()).toBeTruthy();
	    });

	    it("the first row has 3 O's", function() {
	    	app.placeMove(0, 'O');
	    	app.placeMove(1, 'O');
	    	app.placeMove(2, 'O');
        app.placeMove(3, 'O');
	    	expect(app.checkWin()).toBeTruthy();
	    });

	});

	describe("changing an O or X to accommodate for human choice", function() {
	    it("human chose O", function() {
	    	expect(app.humanChoice('O')).toBe('O');
	    	expect(app.cc).toBe('X');
	    });

	    it("human clicked on X choice", function() {
	    	$('.choose-x').click(); 
	    	expect(app.hc).toBe('X');
	    	expect(app.cc).toBe('O');
	    });

	    it("human move resulted in an O", function() {
	    	$('.choose-o').click();
	    	$('.game-block-0').click();
	    	expect($('.game-block-0').text()).toContain('O');
	    });

	    it("make sure click functionality is working", function() {
	    	var spyEvent = spyOnEvent('.game-block', 'click');
			  $('.game-block').click();
			  expect('click').toHaveBeenTriggeredOn('.game-block');
			  expect(spyEvent).toHaveBeenTriggered()
	    });

	});

	describe('computer will counter with a move based upon what the human chose', function() {
		it('if human makes a move, comp should respond with a move', function() {
			var len = app.checkArrAmounts();
			app.humanMove(1);
			expect(app.checkArrAmounts()).toEqual(len + 2);
		});

		it('should return a value if the computer does react', function() {
			expect(app.comp.react(app.cc,app.hc)).toBeDefined();
		});	

		it('should put an x in the 2 spot if the computer chose top right and the human clicked on o', function() {
			$('.choose-o').click();
			app.compMove(2);
			expect(app.spotArray[2]).toBe('X');
		});

		it('should put an x in the 6 spot if the computer chose top right and the human clicked on o', function() {
			$('.choose-o').click();
			app.compMove(6);
			expect(app.spotArray[6]).toBe('X');
		});

		it('should put an o in the 6 spot if the computer chose top right and the human clicked on o', function() {
			$('.choose-x').click();
			app.compMove(6);
			expect(app.spotArray[6]).toBe('O');
		});
	});

	describe('first move', function() {
		it('human chose to go first', function() {
			app.goFirst('human');
			expect(app.goFirst('human')).toBe('human');
			expect(app.firstMove).toBe('human');
		});

		it('human clicked to go first', function() {
			$('.go-first').click();
			expect(app.firstMove).toBe('human');
		});

		it('human clicked to go second', function() {
			$('.go-second').click();
			expect(app.firstMove).toBe('comp');
		});

		it('human chose to go second and chose to be X, computer makes first move', function() {
			$('.choose-x').click();
			$('.go-second').click();
			expect(app.spotArray[5]).toBe('O');
		})

		it('human chose to go first, first move was at anything other than middle right, and chose to be X, middle right block should be filled with an O', function() {
			$('.choose-x').click();
			$('.go-first').click();
			app.spotArray = ['','','X','','','','','','','','','','','','',''];
			expect(app.comp.react(app.cc,app.hc)).toBe(5);
			app.spotArray = ['','','','','','','','','','','','','','','',''];
			app.humanMove(2);
			expect(app.spotArray[5]).toBe('O');
		});

		it('human chose to go first, first move was at 5 block, and chose to be X, 6 block should be filled with an O', function() {
			$('.choose-x').click();
			$('.go-first').click();
			app.spotArray = ['','','','','','X','','','','','','','','','',''];
			expect(app.comp.react(app.cc,app.hc)).toBe(6);
			app.spotArray = ['','','','','','','','','','','','','','','',''];
			app.humanMove(5);
			expect(app.spotArray[6]).toBe('O');
		});

	});

	describe('computer wants to win', function() {

		it('if there are three computer moves already in a row and it is the comps turn, the comp should fill the fourth spot. In this case, two comp moves at position 0 and 1 and 2, it will try to get pos 3', function() {
			app.cc = 'O';
			app.hc = 'X';
			app.spotArray[0] = 'O';
			app.spotArray[1] = 'O';
      app.spotArray[2] = 'O';
			app.humanMove(8);
			expect(app.spotArray[3]).toBe('O');
			expect(app.checkWin()).toBe(true);
		});

		it('if there are two computer moves already in a row and it is the comps turn, the comp should fill the third spot. In this case, two comp moves at position 0 and 3, it will try to get pos 6', function() {
			app.cc = 'O';
			app.hc = 'X';
			app.spotArray[0] = 'O';
			app.spotArray[4] = 'O';
      app.spotArray[8] = 'O';
			app.humanMove(5);
			expect(app.spotArray[12]).toBe('O');
			expect(app.checkWin()).toBe(true);
		});
	});

	describe('computer reactions after first move', function() {

    it('will see 2 human moves in a row and put a computer move in that row', function () {
	 		////////////////['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
			app.spotArray = ['','','','','X','','X','','','','','','O','','',''];
      expect(app.comp.react(app.cc,app.hc)).toMatchEitherNumber(5,7);
    });

    it('will see 2 human moves in a column and put a computer move in that row', function () {
	 		////////////////['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
			app.spotArray = ['','','','','X','','','','X','','','','','','','O'];
      expect(app.comp.react(app.cc,app.hc)).toMatchEitherNumber(0,12);
    });

    it('will see 2 human moves in one row and 3 human moves in another row. It is the computer move and it will block the 3 in a row vice 2 in a row.', function () {
	 		////////////////['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
			app.spotArray = ['X','X','X','','X','X','','','','','','','','','',''];
      expect(app.comp.react(app.cc,app.hc)).toMatchEitherNumber(3);
    });

    it('will see 2 human moves in one row and 3 human moves in another row. It is the computer move and it will block the 3 in a row vice 2 in a row.', function () {
	 		////////////////['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
			app.spotArray = ['X','X','','','X','X','X','','','','','','','','',''];
      expect(app.comp.react(app.cc,app.hc)).toMatchEitherNumber(7);
    });
	});

	describe('computer does a random move', function() {

		it('should not set the value of an already taken spot in the array', function() {
			app.humanChoice('X');
			var len = app.checkArrAmounts();
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', '', '', '', 'O', '', '', '', ''];
			function checkRandom () {
				var rm;
				for (var i = 10000; i >= 0; i--) {
					if (app.spotArray[app.comp.randomMove()] !== '') {
						rm = false;
						return false;
					} else {
						rm = true;
					}
				};
				return rm;
			}
			expect(checkRandom()).toBe(true);
		});

	});

	describe('functions within app.comp.react', function() {

		it('should return the right number if there is a chance to block in a row', function() {
			app.humanChoice('O');
			////////////////['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
			app.spotArray = ['O','O','O','','','','','','','','','','','','',''];
			expect(app.comp.goForRow()).toBe(3);
		});

		it('should return the right number if there is a chance to block in a column', function() {
			app.humanChoice('O');
	  	////////////////['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
			app.spotArray = ['O','','','','O','','','','','','','','O','','',''];
			expect(app.comp.goForRow()).toBe(8);
		});

		it('should return app.comp.reactVal with a number', function() {
			app.humanChoice('X');
			////////////////['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
			app.spotArray = ['','','X','','','','','','','','','','','','',''];
			app.comp.react(app.cc,app.hc);
			expect(app.comp.reactVal).toEqual(jasmine.any(Number));
		});

		it('should return the right number if there is a chance to win in a row', function() {
			app.humanChoice('X');
			////////////////['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
			app.spotArray = ['','','','','','O','O','O','','','','','','','',''];
			expect(app.comp.goForRow()).toBe(4);
		});

		it('should return the right number if there is a chance to win in a column', function() {
			app.humanChoice('X');
			////////////////['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
			app.spotArray = ['','O','','','','O','','','','O','','','','','',''];
			expect(app.comp.goForRow()).toBe(13);
		});		

		it('should return the right number from a smart move if there is no chance to block/win', function() {
			app.humanChoice('O');
			////////////////['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
			app.spotArray = ['O','','O','','','','','X','','','','','','','',''];
			expect(app.comp.goForRow()).toBe(false);
			expect(app.comp.preemptiveBlock(app.cc,app.hc)).toMatchEitherNumber(1,3);
    });

		it('should do a random move if there is no chance to block/win and no reason to smart move. Random move starts at pos 8 and works its way down', function() {
			app.humanChoice('O');
			////////////////['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
			app.spotArray = ['X','X','O','O','O','','X','','','','','','','','',''];
			expect(app.comp.goForRow()).toBe(false);
			expect(app.comp.preemptiveBlock(app.cc,app.hc)).toBe(false);
			expect(app.comp.randomMove()).toBe(15);
		});

	});

});

// to test:
// -see check to see if ANY three in a row match
// -game doesn't end before all 9 spaces are taken up or 3 in a row
