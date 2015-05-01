app.comp = {

	reactVal: false,

	react: function (cc, hc) {
		var arr = app.spotArray;
		app.comp.reactVal = false;

		app.comp.goForBlock(0,1,2,cc,hc);

		return app.reactVal;
	},

	goForBlock: function (num, param1,param2,cc,hc) {
		var block = app.spotArray[num];
	    var block1 = app.spotArray[num + param1];
	    var block2 = app.spotArray[num + param2];

	    // console.log(app.spotArray);
	    // console.log(app.spotArray[num]);
	    // console.log(app.spotArray[num + param1]);
	    // console.log(app.spotArray[num + param2]);

		if (block === block1 && block === hc && block1 === hc && block2 === '') {
	        app.comp.reactVal = num + param2;
	    } else if (block === block2 && block === hc && block2 === hc && block1 === '') {
	        app.comp.reactVal = num + param1;
	    }

	    if (app.reactVal !== false) {
	    	return app.comp.reactVal;
	    } else {
	    	return false;
	    }
	}
	
};


















