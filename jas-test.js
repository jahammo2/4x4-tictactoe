describe("game", function() {
	beforeEach(function () {
		app.emptyArray();
		app.gameOver = false;
		app.hc = '';
		app.cc = '';
	});

	function checkArrAmounts () {
		var amt = 0;
		for (var i = app.spotArray.length - 1; i >= 0; i--) {
			if (app.spotArray[i] === 'X' || app.spotArray[i] === 'O') {
				amt ++;
			}
		};
		return amt;
	}

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

	    it("on click of center left, a piece was filled", function() {
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
			var len = checkArrAmounts();
			app.humanMove(1);
			expect(checkArrAmounts()).toEqual(len + 2);
		});

		it('should return a value if the computer does react', function() {
			expect(app.comp.react(app.cc,app.hc)).toBeDefined();
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
			expect(app.comp.react(app.cc,app.hc)).toBe(4);
			expect(app.spotArray[4]).toBe('O');
		});

		it('human chose to go first, first move was at middle, and chose to be X, top left block should be filled with an O', function() {
			$('.choose-x').click();
			$('.go-first').click();
			app.humanMove(4);
			expect(app.comp.react(app.cc,app.hc)).toBe(0);
			expect(app.spotArray[0]).toBe('O');
		});

	});

	describe('computer wants to win', function() {

		it('should change to computers move after human move', function() {
			app.humanMove(2);
			expect(app.compTurn).toBe(true);
		});

		it('if there are two computer moves already in a row and it is the comps turn, the comp should fill the third spot. In this case, two comp moves at position 0 and 1, it will try to get pos 2', function() {
			app.cc = 'O';
			app.spotArray[0] = 'O';
			app.spotArray[1] = 'O';
			app.humanMove(3);
			expect(compReact()).toBe(2);
			expect(app.spotArray[2]).toBe('O');
			expect(app.checkWin()).toBe(true);
		});

		it('if there are two computer moves already in a row and it is the comps turn, the comp should fill the third spot. In this case, two comp moves at position 0 and 3, it will try to get pos 6', function() {
			app.cc = 'O';
			app.spotArray[0] = 'O';
			app.spotArray[3] = 'O';
			app.humanMove(4);
			expect(compReact()).toBe(6);
			expect(app.spotArray[6]).toBe('O');
			expect(app.checkWin()).toBe(true);
		});
	});

	describe('computer reactions after first move', function() {

		///////////// LESS THAN 4 MOVES
		
		it('should place comp move at pos 6 if 1. human moves are on 4 and 8, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X', function() {
			app.humanChoice('X');
			////////////////['1','2','3','4','5','6','7','8','9']
			app.spotArray = ['', '', '', '', '', '', '', '', ''];
			app.spotArray[0] = 'O';
			app.spotArray[4] = 'X';
			app.humanMove(8);
			expect(app.comp.react(app.cc,app.hc)).toBe(6);
		});

		it('should place comp move at pos 6 if 1. human moves are on 4 and 0, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', 'X', '', '', 'O', '', '', '', ''];
			app.humanMove(0);
			expect(app.comp.react(app.cc,app.hc)).toBe(6);
		});

		it('should place comp move at pos 2 if 1. human moves are on 1 and 8, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', 'X', '', '', 'O', '', '', '', ''];
			app.humanMove(8);
			expect(app.comp.react(app.cc,app.hc)).toBe(2);
		});

		it('should place comp move at pos 0 if 1. human moves are on 1 and 6, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['X', '', '', '', 'O', '', '', '', ''];
			app.humanMove(6);
			expect(app.comp.react(app.cc,app.hc)).toBe(0);
		});

		it('should place comp move at pos 6 if 1. human moves are on 3 and 8, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', '', '', 'X', 'O', '', '', '', ''];
			app.humanMove(8);
			expect(app.comp.react(app.cc,app.hc)).toBe(6);
		});

		it('should place comp move at pos 0 if 1. human moves are on 3 and 2, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', '', '', 'X', 'O', '', '', '', ''];
			app.humanMove(2);
			expect(app.comp.react(app.cc,app.hc)).toBe(0);
		});

		it('should place comp move at pos 2 if 1. human moves are on 5 and 0, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', '', '', '', 'O', 'X', '', '', ''];
			app.humanMove(0);
			expect(app.comp.react(app.cc,app.hc)).toBe(2);
		});

		it('should place comp move at pos 8 if 1. human moves are on 5 and 6, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', '', '', '', 'O', 'X', '', '', ''];
			app.humanMove(6);
			expect(app.comp.react(app.cc,app.hc)).toBe(8);
		});

		it('should place comp move at pos 8 if 1. human moves are on 7 and 2, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', '', '', '', 'O', '', '', 'X', ''];
			app.humanMove(2);
			expect(app.comp.react(app.cc,app.hc)).toBe(8);
		});

		it('should place comp move at pos 6 if 1. human moves are on 7 and 0, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', '', '', '', 'O', '', '', 'X', ''];
			app.humanMove(0);
			expect(app.comp.react(app.cc,app.hc)).toBe(6);
		});

		it('should place comp move at pos 6 if 1. human moves are on 7 and 3, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', '', '', '', 'O', '', '', 'X', ''];
			app.humanMove(3);
			expect(app.comp.react(app.cc,app.hc)).toBe(6);
		});

		it('should place comp move at pos 8 if 1. human moves are on 7 and 5, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', '', '', '', 'O', '', '', 'X', ''];
			app.humanMove(5);
			expect(app.comp.react(app.cc,app.hc)).toBe(8);
		});

		it('should place comp move at pos 2 if 1. human moves are on 1 and 5, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', 'X', '', '', 'O', '', '', '', ''];
			app.humanMove(5);
			expect(app.comp.react(app.cc,app.hc)).toBe(2);
		});

		it('should place comp move at pos 0 if 1. human moves are on 1 and 3, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps first move middle', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', 'X', '', '', 'O', '', '', '', ''];
			app.humanMove(3);
			expect(app.comp.react(app.cc,app.hc)).toBe(0);
		});

		///////////// LESS THAN 6 MOVES

		it('should place comp move at pos 6 if 1. human moves are on 1, 4, and 8, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps moves are on 0 and 7', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['0', 'X', '', '', 'X', '', '', '0', ''];
			app.humanMove(8);
			expect(app.comp.react(app.cc,app.hc)).toBe(6);
		});

		it('should place comp move at pos 2 if 1. human moves are on 3, 4, and 8, 2. only 3 moves have occured, 3. comps move is the fourth move, 4. human chose to be X, 5. comps moves are on 0 and 5', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['0', '', '', 'X', 'X', '0', '', '', ''];
			app.humanMove(8);
			expect(app.comp.react(app.cc,app.hc)).toBe(2);
		});

	});
	
	describe('computer does a random move', function() {
		
		it('should not set the value of an already taken spot in the array', function() {
			app.humanChoice('X');
			var len = checkArrAmounts();
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', '', '', '', 'O', '', '', '', ''];
			function checkRandom () {
				var rm;
				for (var i = 10000; i >= 0; i--) {
					if (app.spotArray[app.comp.react(app.cc,app.hc).randomMove()] !== '') {
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

	describe('functions within compReact', function() {

		it('should return the right number if there is a chance to block in a row', function() {
			app.humanChoice('O');
			app.spotArray = ['O', 'O', '', '', '', '', '', '', ''];
			expect(app.comp.goForBlock(0,1,2,app.cc,app.hc)).toBe(2);
		});

		it('should return the right number if there is a chance to block in a column', function() {
			app.humanChoice('O');
			app.spotArray = ['O', '', '', '', '', '', 'O', '', ''];
			expect(app.comp.goForBlock(0,3,6,app.cc,app.hc)).toBe(3);
		});

		// it('should return app.comp.reactVal with a number', function() {
		// 	app.humanChoice('X');
		// 	app.spotArray = ['', '', '', 'O', 'O', '', '', '', ''];
		// 	app.comp.react(app.cc,app.hc);
		// 	expect(app.comp.reactVal).toEqual(jasmine.any(Number));
		// });

		// it('should return the right number if there is a chance to win in a row', function() {
		// 	app.humanChoice('X');
		// 	app.spotArray = ['', '', '', 'O', 'O', '', '', '', ''];
		// 	expect(app.comp.goForWin()).toBe(5);
		// });

		// it('should return the right number if there is a chance to win in a column', function() {
		// 	app.humanChoice('X');
		// 	app.spotArray = ['O', '', '', 'O', '', '', '', '', ''];
		// 	expect(app.comp.react(app.cc,app.hc).goForWin()).toBe(6);
		// });		

		// it('should return the right number if there is a chance to block in a column', function() {
		// 	app.humanChoice('O');
		// 	app.spotArray = ['O', '', '', 'O', '', '', '', '', ''];
		// 	expect(app.comp.react(app.cc,app.hc).goForWin()).toBe(false);
		// 	expect(app.comp.react(app.cc,app.hc).goForBlock()).toBe(6);
		// });

		// it('should return the right number from a smart move if there is no chance to block/win', function() {
		// 	app.humanChoice('O');
		// 	app.spotArray = ['', 'X', '', '', 'O', '', '', '', ''];
		// 	expect(app.comp.react(app.cc,app.hc).goForWin()).toBe(false);
		// 	expect(app.comp.react(app.cc,app.hc).goForBlock()).toBe(false);
		// 	expect(app.comp.react(app.cc,app.hc).smartMove()).toBe(0);
		// });
		
		// it('should do a random move if there is no chance to block/win and no reason to smart move. Random move starts at pos 8 and works its way down', function() {
		// 	app.humanChoice('O');
		// 	app.spotArray = ['O', '', '', '', 'X', '', '', '', ''];
		// 	expect(app.comp.react(app.cc,app.hc).goForWin()).toBe(false);
		// 	expect(app.comp.react(app.cc,app.hc).goForBlock()).toBe(false);
		// 	expect(app.comp.react(app.cc,app.hc).smartMove()).toBe(false);
		// 	expect(app.comp.react(app.cc,app.hc).randomMove()).toBe(8);
		// });

	});

	describe('order of functions', function() {

		it('should call smartMove() if there is no chance to win or block', function() {
			app.humanChoice('X');
			////////////////['0', '1','2','3','4','5','6','7','8']
			app.spotArray = ['', '', '', '', 'O', '', '', 'X', ''];
			var fakeSpy = new app.comp.react(app.cc,app.hc);
			fakeSpy.smartMove = jasmine.createSpy("Say-hello spy");
			app.humanMove(0);
	        expect(fakeSpy.smartMove).toHaveBeenCalled();
		});
		
	});

});

// to test:
// -see check to see if ANY three in a row match
// -game doesn't end before all 9 spaces are taken up or 3 in a row






































