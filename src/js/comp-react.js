app.comp = {

	reactVal: false,

	react: function (cc,hc) {
		var arr = app.spotArray;
		app.comp.reactVal = false;
		if (app.comp.reactVal === false) {
			app.comp.reactVal = app.comp.goForRow();
		}
    if (app.comp.reactVal === false) {
			app.comp.reactVal = app.comp.preemptiveBlock(cc,hc);
		}
		if (app.comp.reactVal === false) {
			app.comp.reactVal = app.comp.smartMove(cc,hc);
		}
		if (app.comp.reactVal === false) {
			app.comp.reactVal = app.comp.randomMove();
      console.log(app.comp.reactVal);
		}
    console.log(app.comp.reactVal);
		return app.comp.reactVal;
	},

	goForRow: function () {
		var matched = false;
		function checkRow (num,param1,param2,param3) {
		  	var block = app.spotArray[num];
		    var block1 = app.spotArray[param1];
		    var block2 = app.spotArray[param2];
        var block3 = app.spotArray[param3];

		    // console.log(app.spotArray);
		    // console.log(app.spotArray[num]);
		    // console.log(app.spotArray[num + param1]);
		    // console.log(app.spotArray[num + param2]);

		    if (block === (block1 && block3) && block2 === '' && block !== '') {
		        matched = param2;
		    } else if (block === (block2 && block3) && block1 === '' && block !== '') {
		        matched = param1;
         } else if (block === (block2 && block1) && block3 === '' && block !== '') {
		        matched = param3;
		    } else if (block1 === (block2 && block3) && block === '' && block1 !== '') {
		        matched = num;
		    } else {
		    	matched = false;
		    }
		}
		if (matched === false) {
			checkRow(0,1,2,3);
		}
		if (matched === false) {
			checkRow(4,5,6,7);
		}
		if (matched === false) {
			checkRow(8,9,10,11);
		}
		if (matched === false) {
			checkRow(12,13,14,15);
		}
		if (matched === false) {
			checkRow(0,4,8,12);
		}
		if (matched === false) {
			checkRow(1,5,9,13);
		}
		if (matched === false) {
			checkRow(2,6,10,14);
		}
		if (matched === false) {
			checkRow(3,7,11,15);
		}
    if (matched === false) {
			checkRow(0,5,10,15);
		}
    if (matched === false) {
			checkRow(3,6,9,12);
		}
    console.log(matched);
		return matched;
	},

  preemptiveBlock: function (cc,hc) {
    var matched = false;
		function checkRow (num,param1,param2,param3) {
		  	var block = app.spotArray[num];
		    var block1 = app.spotArray[param1];
		    var block2 = app.spotArray[param2];
        var block3 = app.spotArray[param3];
        var array = [num,param1,param2,param3];
        function findBlank () {
          var len = 3;
          var spot;
          while (len >= 0) {
            if (app.spotArray[array[len]]=== '') {
              spot = array[len];
            }
            len --;
          }
          return spot;
        }

        if ((block === (block1 || block2 || block3)) && block === hc && (((block1 && block2) || (block3 && block2) || (block1 && block3)) === '')) {
          matched = findBlank();
        } else if ((block1 === (block || block2 || block3)) && block1 === hc && (((block && block2) || (block3 && block2) || (block && block3)) === '')) {
          matched = findBlank();
        } else if ((block2 === (block || block1 || block3)) && block2 === hc && (((block && block1) || (block3 && block1) || (block && block3)) === '')) {
          matched = findBlank();
        } else if ((block3 === (block || block1 || block2)) && block3 === hc && (((block && block1) || (block2 && block1) || (block && block2)) === '')) {
          matched = findBlank();
		    } else {
        matched = false
        }
        
      }
      if (matched === false) {
        checkRow(0,1,2,3);
      }
      if (matched === false) {
        checkRow(4,5,6,7);
      }
      if (matched === false) {
        checkRow(8,9,10,11);
      }
      if (matched === false) {
        checkRow(12,13,14,15);
      }
      if (matched === false) {
        checkRow(0,4,8,12);
      }
      if (matched === false) {
        checkRow(1,5,9,13);
      }
      if (matched === false) {
        checkRow(2,6,10,14);
      }
      if (matched === false) {
        checkRow(3,7,11,15);
      }
      if (matched === false) {
        checkRow(0,5,10,15);
      }
      if (matched === false) {
        checkRow(3,6,9,12);
      }
      console.log(matched);
      return matched;
  },

	smartMove: function (cc,hc) {
		var amt = app.checkArrAmounts();
     if (amt < 2) {
		   if (app.spotArray[5] === '') {
	  	   return 5;
		   } else {
		     return 6;
       }
     } else {
        return false;
     }

	},

	randomMove: function () {
		var arr = app.spotArray;
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === '') {
          console.log(i);
            return i;
        };
    };
	}
	
};


















