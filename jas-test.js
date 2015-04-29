describe("game", function() {
	beforeEach(function () {
		app.emptyArray();
	});

	describe("creating a move", function() {
	    it("top left has an x", function() {
	    	expect(app.placeXMove(0)).toBe('X');
	    });

	    it("top right has an x", function() {
	    	expect(app.placeXMove(2)).toBe('X');
	    });

	    it("bottom middle has an O", function() {
	    	expect(app.placeOMove(7)).toBe('O');
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

		// it("make sure counter functionality happens", function() {
		//    	app.placeXMove(0);
		//    	var fakeMove = app.placeXMove;
		//    	spyOn(fakeMove, "app.counterWin");
		//    	// spyOn(fakeMove, "app.counterWin").and.callThrough();
		//    	expect(fakeMove.app.counterWin).toHaveBeenCalled();
		//    });

	    it("with space 0 and 1 (top left and top middle) occupied with an X, place an O in top right", function() {
	    	app.placeXMove(0);
	    	app.placeXMove(1);
	    	// spyOn(app.counterWin, "app.placeOMove");
	    	expect(app.spotArray[2]).toBe('O');
	    });

	    it("see if a diagonal does the same as the one at top", function() {
	    	app.placeXMove(2);
	    	app.placeXMove(4);
	    	// spyOn(app.counterWin, "app.placeOMove");
	    	expect(app.spotArray[6]).toBe('O');
	    });

	    it("with any 2 spaces occupied with an X that are in a position of winning, block move with an O", function() {

	    });

	});

	
});

// to test:
// -see check to see if ANY three in a row match






































