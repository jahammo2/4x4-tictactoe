console.log($('#' + 1).text());

app.spotArray = ['','','','','','','','',''];

var clickedBlock;

console.log('test');

app.placeMove = function (num) {
    
    app.spotArray.splice(num,0,'X');
    // app.spotArray.push(block.attr('id'));
    clickedBlock = num;
    // app.spotArray = app.spotArray.sort();
    console.log(app.spotArray[num]);
    return app.spotArray[num];
}

$('.game-block').on('click', function() {
	var block = $(this);
	block.html('X');
    app.placeMove(block.attr('id'));
});

app.placeMove();