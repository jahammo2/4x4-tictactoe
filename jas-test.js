describe("game", function() {
	beforeEach(function () {
		app.emptyArray();
	});

	describe("creating a move", function() {
	    it("top left has an x", function() {
	    	// waitsFor(function() {
	    	// 	app.placeXMove();
	    	// },"failed",999999999999);
	    	// app.placeXMove(0);
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
	    	expect(app.checkWin(0,1,2)).toBeTruthy();
	    });

	    it("a diagonal has 3 x's", function() {
	    	app.placeXMove(0);
	    	app.placeXMove(4);
	    	app.placeXMove(8);
	    	expect(app.checkWin(0,4,8)).toBeTruthy();
	    });

	    it("a column has 3 O's", function() {
	    	app.placeOMove(0);
	    	app.placeOMove(3);
	    	app.placeOMove(6);
	    	expect(app.checkWin(0,3,6)).toBeTruthy();
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

	    it("with any 2 spaces occupied with an X that are in a position of winning, block move with an O", function() {
	    	app.placeXMove(2);
	    	app.placeXMove(4);
	    	// spyOn(app.counterWin, "app.placeOMove");
	    	expect(app.spotArray[6]).toBe('O');
	    });

	});
});






































