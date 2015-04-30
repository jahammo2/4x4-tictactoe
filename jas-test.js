describe("game", function() {
	beforeEach(function () {
		app.emptyArray();
	});

	describe("creating a move", function() {
		// var spyEvent;

	    it("top left has an x", function() {
	    	expect(app.placeXMove(0)).toBe('X');
	    });

	    it("top right has an x", function() {
	    	expect(app.placeXMove(2)).toBe('X');
	    });

	    it("bottom middle has an O", function() {
	    	expect(app.placeOMove(7)).toBe('O');
	    });

	    it("on click, a piece was filled", function() {
		    $('.game-block-1').click();
		    expect(app.placeXMove(0)).toBe('X');
	    });
	});

	describe("see if a row matches", function() {

	    it("the first row has 3 x's", function() {
	    	app.placeXMove(0);
	    	app.placeXMove(1);
	    	app.placeXMove(2);
	    	expect(app.checkWin()).toBeTruthy();
	    });

	    it("if there are 3 X's but not in a row, it should return falsy", function() {
	    	app.placeXMove(0);
	    	app.placeXMove(1);
	    	app.placeXMove(4);
	    	expect(app.checkWin()).toBeFalsy();
	    });

	    it("the first column has 3 x's", function() {
	    	app.placeXMove(0);
	    	app.placeXMove(3);
	    	app.placeXMove(6);
	    	expect(app.checkWin()).toBeTruthy();
	    });

	    it("the first diagonal has 3 x's", function() {
	    	app.placeXMove(0);
	    	app.placeXMove(4);
	    	app.placeXMove(8);
	    	expect(app.checkWin()).toBeTruthy();
	    });

	});

	describe("make the computer counter two x's in a row with a O", function() {

	    it("with space 0 and 1 (top left and top middle) occupied with an X, place an O in top right", function() {
	    	app.placeXMove(0);
	    	app.placeXMove(1);
	    	expect(app.placeOMove(2)).toBe('O');        
	    });

	    it("see if a diagonal does the same as the one at top", function() {
	    	app.placeXMove(2);
	    	app.placeXMove(4);
	    	expect(app.placeOMove(6)).toBe('O');   
	    });

	    it("see if a column does the same as the one at top", function() {
	    	app.placeXMove(0);
	    	app.placeXMove(3);
	    	expect(app.placeOMove(6)).toBe('O');   
	    });

	});

	describe("changing an O or X to accommodate for human choice", function() {
	    it("human chose O", function() {
	    	expect(app.humanChoice('O')).toBe('O');
	    });

	    it("human clicked on X choice", function() {
	    	$('.choose-x').click();
	    	console.log($('.choose-x'))
	    	expect(app.humanChoice('X')).toBe('X')
	    });

	    it("human move resulted in an O", function() {
	    	$('.choose-o').click();
	    	$('.game-block-1').click();
	    	console.log($('.game-block-1'));
	    	$('.game-block-1').context.textContent = 'O';
	    	console.log($('.game-block-1').context.textContent);
	    	console.log($('.game-block-1').text());
	    	expect($('.game-block-1').text()).toContain('O');
	    });

	    it("comp move resulted in an X", function() {
	    	// $('.choose-x').click();
	    	// $('.game-block-2').click();
	    	// expect($('.game-block-2').text()).toContain('X');
	    	var spyEvent = spyOnEvent('.game-block', 'click');
			$('.game-block').click();
			expect('click').toHaveBeenTriggeredOn('.game-block');
			expect(spyEvent).toHaveBeenTriggered()
			// var spyEvent = spyOnEvent($('.game-block'), 'click')
			// $j('.game-block').click()
			// expect('click').toHaveBeenTriggeredOn($('.game-block'))
			// expect(spyEvent).toHaveBeenTriggered()
	    });

	});
	
});

// to test:
// -see check to see if ANY three in a row match






































