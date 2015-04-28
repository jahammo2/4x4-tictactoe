describe("creating an x", function() {
    it("top left has an x", function() {
    	// waitsFor(function() {
    	// 	app.placeMove();
    	// },"failed",999999999999);
    	// app.placeMove(0);
    	expect(app.placeMove(0)).toBe('X');
    });

    it("top right has an x", function() {
    	expect(app.placeMove(2)).toBe('X');
    });
});

describe("see if a row matches", function() {

    it("the first row has 3 x's", function() {
    	app.placeMove(0);
    	app.placeMove(1);
    	app.placeMove(2);
    	expect(app.checkWin(0,1,2)).toBeTruthy();
    });
});