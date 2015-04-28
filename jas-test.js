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
	    	expect(app.checkWin()).toBeTruthy();
	    });

	    it("if there are 3 X's but not in a row, it should return falsy", function() {
	    	app.placeXMove(0);
	    	app.placeXMove(1);
	    	app.placeXMove(4);
	    	expect(app.checkWin()).toBeFalsy();
	    });

	    // function send3Back (i, j, k) {
	    // 	return ((i !== j) && (j !== k) && (i !== k)) && ((app.spotArray[i] !== '') && (app.spotArray[j] !== '') && (app.spotArray[k] !== ''));
	    // }

	    // it("if any set of 3 X's in a row matchup and return checkWin as truthy", function() {
	    // 	for (var i = 8; i >= 0; i--) {
	    // 		app.placeXMove(i);
	    // 		for (var j = 8; j >= 0; j--) {
		   //  		app.placeXMove(j);
		   //  		for (var k = 8; k >= 0; k--) {
			  //   		app.placeXMove(k);
			  //   		if (send3Back(i,j,k)) {
			  //   			expect(app.checkWin(i,j,k)).toBeTruthy();
			  //   			app.spotArray.splice(k,1,'');
			  //   		} else if (k !== j && k !== i) {
			  //   			app.spotArray.splice(k,1,'');
			  //   		}
			  //   	};
			  //   	app.spotArray.splice(j,1,'');
		   //  	};
		   //  	app.spotArray.splice(i,1,'');
	    // 	};
	    // });

	    // it("if any set of 3 X's in a row matchup and return checkWin as truthy", function() {
	    // 	for (var i = 8; i >= 0; i--) {
	    // 		app.placeOMove(i);
	    // 		for (var j = 8; j >= 0; j--) {
		   //  		app.placeOMove(j);
		   //  		for (var k = 8; k >= 0; k--) {
			  //   		app.placeOMove(k);
			  //   		if (send3Back(i,j,k)) {
			  //   			expect(app.checkWin(i,j,k)).toBeTruthy();
			  //   			app.spotArray.splice(k,1,'');
			  //   		} else if (k !== j && k !== i) {
			  //   			app.spotArray.splice(k,1,'');
			  //   		}
			  //   	};
			  //   	app.spotArray.splice(j,1,'');
		   //  	};
		   //  	app.spotArray.splice(i,1,'');
	    // 	};
	    // });
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






































