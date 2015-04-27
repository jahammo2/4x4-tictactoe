app.gameFunctionality = function() {

    if (app.gameBegan === true) {
        location.reload()
    }

    app.gameBegan = true;

    var blocks = $('.game-block');

    function styleOs() {
        for (var i = blocks.length - 1; i >= 0; i--) {
            if (blocks[i].innerHTML === 'O') {
                blocks[i].style.paddingRight = 2 + '%'
                blocks[i].style.paddingLeft = 0 + '%'
            }
        };
    }

    var randomNum = Math.random();

    if (randomNum >= .5) {
        $('.first-heading').html('Computer goes first');
        window.setTimeout(function() {
            $('.game-block-first').html('O');
            styleOs();
        }, 1000);
    } else {
        $('.first-heading').html('You go first');
    }

    function computerMove(id) {
        id = Number(id);
        $('.game-blocker-checkbox').prop('checked', true);
        window.setTimeout(function() {
            app.computerReact(id);
            $('.game-blocker-checkbox').prop('checked', false);
            app.checkWin();
            styleOs();
        }, 1000);
    }

    app.moves = [];
    app.turnCount = 0;

    $('.game-block').on('click', function() {
        var block = $(this);
        app.stoppage = false;
        app.humanMove = false;
        app.randomDone = true;
        styleOs;
        if (block.html() === '') {
            app.turnCount += 1;
            block.html('X');
            app.checkWin();
            computerMove(block.attr('id'));
        } else {
            console.log('spot already taken');
        }
    });

};