describe("game", function() {
	beforeEach(function () {
		app.emptyArray();
		app.gameOver = false;
		app.hc = '';
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
		    $('.game-block-3').click();
		    expect(app.spotArray[2]).not.toBe('');
	    });

	    it("on click of top right, a piece was filled", function() {
		    $('.game-block-4').click();
		    expect(app.spotArray[3]).not.toBe('');
	    });
	});

	describe("see if a row matches", function() {
	    it("the first row has 3 x's", function() {
	    	app.placeMove(0, 'X');
	    	app.placeMove(1, 'X');
	    	app.placeMove(2, 'X');
	    	expect(app.checkWin()).toBeTruthy();
	    });

	    it("if there are 3 X's but not in a row, it should return falsy", function() {
	    	app.placeMove(0, 'X');
	    	app.placeMove(1, 'X');
	    	app.placeMove(4, 'X');
	    	expect(app.checkWin()).toBeFalsy();
	    });

	    it("the first column has 3 x's", function() {
	    	app.placeMove(0, 'X');
	    	app.placeMove(3, 'X');
	    	app.placeMove(6, 'X');
	    	expect(app.checkWin()).toBeTruthy();
	    });

	    it("the first diagonal has 3 x's", function() {
	    	app.placeMove(0, 'X');
	    	app.placeMove(4, 'X');
	    	app.placeMove(8, 'X');
	    	expect(app.checkWin()).toBeTruthy();
	    });

	    it("the first row has 3 O's", function() {
	    	app.placeMove(0, 'O');
	    	app.placeMove(1, 'O');
	    	app.placeMove(2, 'O');
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
	    	$('.game-block-1').click();
	    	expect($('.game-block-1').text()).toContain('O');
	    });

	    it("make sure click functionality is working", function() {
	    	var spyEvent = spyOnEvent('.game-block', 'click');
			$('.game-block').click();
			expect('click').toHaveBeenTriggeredOn('.game-block');
			expect(spyEvent).toHaveBeenTriggered()
	    });

	});

	describe("make the computer counter two human moves with a computer move", function() {
		

	    it("with space 0 and 1 (top left and top middle) occupied with an X, place an O in top right", function() {
	    	$('.choose-x').click();
	    	app.placeMove(0, 'X');
	    	app.placeMove(1, 'X');
	    	expect(app.spotArray[2]).toBe('O');        
	    });

	    it("see if a diagonal does the same as the one at top", function() {
	    	$('.choose-x').click();
	    	app.placeMove(2, 'X');
	    	app.placeMove(4, 'X');
	    	expect(app.spotArray[6]).toBe('O');    
	    });

	    it("see if a column does the same as the one at top", function() {
	    	$('.choose-x').click();
	    	app.placeMove(0, 'X');
	    	app.placeMove(3, 'X');
	    	expect(app.spotArray[6]).toBe('O');   
	    });

	    it("with space 0 and 1 (top left and top middle) occupied with an O (by a human), place an X (computer move) in top right", function() {
	    	$('.choose-o').click();
	    	app.placeMove(0, 'O');
	    	app.placeMove(1, 'O');
	    	expect(app.spotArray[2]).toBe('X');        
	    });

	});

	describe('computer will counter with a move based upon what the human chose', function() {
		it('if human makes a move, comp should respond with a move', function() {
			var len = app.spotArray.length;
			app.humanMove(1);
			expect(app.spotArray.length).toEqual(len + 2);
			expect(app.compMove()).toBeDefined();
		});
		
		it('if human chose O, the computer will put an X in top right', function() {
			$('.choose-o').click();
			app.compMove(2);
			expect(app.spotArray[2]).toBe('X');
		});

		it('if human chose O, the computer will put an X in bottom left', function() {
			$('.choose-o').click();
			app.compMove(6);
			expect(app.spotArray[6]).toBe('X');
		});

		it('if human chose X, the computer will put an O in bottom left', function() {
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
			expect(app.spotArray[4]).toBe('O');
		})

		it('human chose to go second and chose to be X, middle block should be filled with an O', function() {
			$('.choose-x').click();
			$('.go-second').click();
			expect(app.spotArray[4]).toBe('O');
		});

		it('human chose to go first, first move was at anything other than middle, and chose to be X, middle block should be filled with an O', function() {
			$('.choose-x').click();
			$('.go-first').click();
			app.humanMove(2);
			expect(app.spotArray[4]).toBe('O');
		});

	});
	
});

// to test:
// -see check to see if ANY three in a row match






































