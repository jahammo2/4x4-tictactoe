app.comp = {

	reactVal: false,

	react: function (cc,hc) {
		var arr = app.spotArray;
		app.comp.reactVal = false;
		if (app.comp.reactVal === false) {
			app.comp.reactVal = app.comp.goForRow();
		}
		if (app.comp.reactVal === false) {
			app.comp.reactVal = app.comp.smartMove(cc,hc);
		}
		if (app.comp.reactVal === false) {
			app.comp.reactVal = app.comp.randomMove();
		}
		return app.comp.reactVal;
	},

	goForRow: function () {
		var matched = false;
		function checkRow (num,param1,param2) {
			var block = app.spotArray[num];
		    var block1 = app.spotArray[param1];
		    var block2 = app.spotArray[param2];

		    // console.log(app.spotArray);
		    // console.log(app.spotArray[num]);
		    // console.log(app.spotArray[num + param1]);
		    // console.log(app.spotArray[num + param2]);

		    if (block === block1 && block2 === '' && block !== '') {
				console.log()
		        matched = param2;
		    } else if (block === block2 && block1 === '' && block !== '') {
		        matched = param1;
		    } else if (block1 === block2 && block === '' && block1 !== '') {
		        matched = num;
		    } else {
		    	matched = false;
		    }
		}
		if (matched === false) {
			checkRow(0,1,2);
		}
		if (matched === false) {
			checkRow(3,4,5);
		}
		if (matched === false) {
			checkRow(6,7,8);
		}
		if (matched === false) {
			checkRow(0,3,6);
		}
		if (matched === false) {
			checkRow(1,4,7);
		}
		if (matched === false) {
			checkRow(2,5,8);
		}
		if (matched === false) {
			checkRow(0,4,8);
		}
		if (matched === false) {
			checkRow(2,4,6);
		}
		return matched;
	},

	smartMove: function (cc,hc) {
		var amt = app.checkArrAmounts();
		if (amt < 2) {
			if (app.spotArray[4] === '') {
				return 4;
			} else {
				return 0;
			}
        } else if (amt < 4) {
            if (app.spotArray[8] === hc && app.spotArray[4] === hc && app.spotArray[6] === '') {
                return 6;
            } else if (app.spotArray[1] === hc && app.spotArray[4] === cc && app.spotArray[8] === hc) {
                return 2;
            } else if (app.spotArray[1] === hc && app.spotArray[4] === cc && app.spotArray[6] === hc) {
                return 0;
            } else if (app.spotArray[3] === hc && app.spotArray[4] === cc && app.spotArray[8] === hc) {
                return 6;
            } else if (app.spotArray[3] === hc && app.spotArray[4] === cc && app.spotArray[2] === hc) {
                return 0;
            } else if (app.spotArray[5] === hc && app.spotArray[4] === cc && app.spotArray[0] === hc) {
                return 2;
            } else if (app.spotArray[5] === hc && app.spotArray[4] === cc && app.spotArray[6] === hc) {
                return 8;
            } else if (app.spotArray[7] === hc && app.spotArray[4] === cc && app.spotArray[2] === hc) {
                return 8;
            } else if (app.spotArray[7] === hc && app.spotArray[4] === cc && app.spotArray[0] === hc) {
                return 6;
            } else if (app.spotArray[7] === hc && app.spotArray[4] === cc && app.spotArray[3] === hc) {
                return 6;
            } else if (app.spotArray[7] === hc && app.spotArray[4] === cc && app.spotArray[5] === hc) {
                return 8;
            } else if (app.spotArray[1] === hc && app.spotArray[4] === cc && app.spotArray[3] === hc) {
                return 0;
            } else if (app.spotArray[1] === hc && app.spotArray[4] === cc && app.spotArray[5] === hc) {
                return 2;
            } else if (app.spotArray[0] === hc && app.spotArray[4] === hc && app.spotArray[8] === cc) {
                return 6;
            } else {
            	return false;
            }
        } else if (amt < 6) {
            if (app.spotArray[8] === hc && app.spotArray[4] === hc && app.spotArray[1] === hc && app.spotArray[7] === cc && app.spotArray[6] === '') {
                return 6;
            } else if (app.spotArray[8] === hc && app.spotArray[4] === hc && app.spotArray[3] === hc && app.spotArray[1] === '') {
                return 1;
            } else {
            	return false;
            }
        } else {
        	return false;
        }
	},

	randomMove: function () {
		var arr = app.spotArray;
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === '') {
                return i;
            };
        };
	}
	
};


















