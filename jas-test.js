describe("creating an x", function() {
	var holder;

	// beforeEach(function () {
	// 	app.placeMove();
	// })

    it("top left has an x", function() {
    	// waitsFor(function() {
    	// 	app.placeMove();
    	// },"failed",999999999999);
    	// app.placeMove(0);

    	expect(app.placeMove(0)).toBe('X');
    });

    it("top right has an x", function() {
    	// waitsFor(function() {
    	// 	app.placeMove();
    	// },"failed",999999999999);
    	// app.placeMove(0);

    	expect(app.placeMove(2)).toBe('X');
    });
});