app.game = function () {

	app.spotArray = ['','','','','','','','',''];

	var clickedBlock;

	console.log($('.game-block'));

	app.placeXMove = function (num) {
	    app.spotArray.splice(num,0,'X');
	    clickedBlock = num;
	    console.log(app.spotArray[num]);
	    app.counterWin();
	    return app.spotArray[num];
	}

	app.placeOMove = function (num) {
	    app.spotArray.splice(num,0,'O');
	    clickedBlock = num;
	    console.log(app.spotArray[num]);
	    block = $('#' + (num + 1));
	    block.html('O');
	    return app.spotArray[num];
	}

	$('.game-block').on('click', function() {
		var block = $(this);
		block.html('X');
	    app.placeXMove(block.attr('id'));
	});

	var blocks = $('.game-block');

	function styleOs() {
	    for (var i = blocks.length - 1; i >= 0; i--) {
	        if (blocks[i].innerHTML === 'O') {
	            blocks[i].style.paddingRight = 2 + '%'
	            blocks[i].style.paddingLeft = 0 + '%'
	        }
	    };
	}






};

app.game();

function prettyDate(now, time){
    var date = new Date(time || ""),
        diff = (((new Date(now)).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) {
        return;
    }

    return diff < 86400 && Math.floor( diff / 3600 ) + " hours ago";
}

console.log(prettyDate("2008-01-28T22:25:00Z", "2008-01-28T20:24:17Z"));