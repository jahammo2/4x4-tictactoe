app.computerReact = function(id) {

    var blocks = $('.game-block');

    var firstT = $('.game-block-first').text(),
        secondT = $('.game-block-second').text(),
        thirdT = $('.game-block-third').text(),
        fourthT = $('.game-block-fourth').text(),
        fifthT = $('.game-block-fifth').text(),
        sixthT = $('.game-block-sixth').text(),
        seventhT = $('.game-block-seventh').text(),
        eighthT = $('.game-block-eighth').text(),
        ninthT = $('.game-block-ninth').text(),
        first = $('.game-block-first'),
        second = $('.game-block-second'),
        third = $('.game-block-third'),
        fourth = $('.game-block-fourth'),
        fifth = $('.game-block-fifth'),
        sixth = $('.game-block-sixth'),
        seventh = $('.game-block-seventh'),
        eighth = $('.game-block-eighth'),
        ninth = $('.game-block-ninth');

    function randomMove() {
        if (app.randomDone) {
            for (var i = blocks.length - 1; i >= 0; i--) {
                if (blocks[i].innerHTML === '') {
                    $('#' + (i + 1)).html('O');
                    i = 0;
                    stopTurn(i);
                };
            };
        }
    }

    function stopTurn(num) {
        app.moves.push(num);
        app.stoppage = true;
        app.randomDone = false;
        app.humanMove = true;
        compTurn = false;
    }

    function goForWin() {
        compTurn = true;
        for (var i = blocks.length - 1; i >= 0; i--) {
            if (blocks[i].innerHTML === 'O') {
                checkId(i + 1);
            };
        };
        compTurn = false;
    }

    var compTurn = false;

    function compMove() {
        if (app.moves.length < 2) {
            if (fifthT === '') {
                app.moves.push(5);
                fifth.html('O');
            } else {
                randomMove();
            }
        } else if (app.moves.length < 4) {
            if (ninthT === 'X' && fifthT === 'X' && seventhT === '') {
                seventh.html('O');
                stopTurn(7);
            } else if (secondT === 'X' && fifthT === 'O' && ninthT === 'X') {
                third.html('O');
                stopTurn(3);
            } else if (secondT === 'X' && fifthT === 'O' && seventhT === 'X') {
                first.html('O');
                stopTurn(1);
            } else if (fourthT === 'X' && fifthT === 'O' && ninthT === 'X') {
                seventh.html('O');
                stopTurn(7);
            } else if (fourthT === 'X' && fifthT === 'O' && thirdT === 'X') {
                first.html('O');
                stopTurn(1);
            } else if (sixthT === 'X' && fifthT === 'O' && firstT === 'X') {
                third.html('O');
                stopTurn(3);
            } else if (sixthT === 'X' && fifthT === 'O' && seventhT === 'X') {
                ninth.html('O');
                stopTurn(9);
            } else if (eighthT === 'X' && fifthT === 'O' && thirdT === 'X') {
                ninth.html('O');
                stopTurn(9);
            } else if (eighthT === 'X' && fifthT === 'O' && firstT === 'X') {
                seventh.html('O');
                stopTurn(7);
            } else if (eighthT === 'X' && fifthT === 'O' && fourthT === 'X') {
                seventh.html('O');
                stopTurn(7);
            } else if (eighthT === 'X' && fifthT === 'O' && sixthT === 'X') {
                ninth.html('O');
                stopTurn(9);
            } else if (secondT === 'X' && fifthT === 'O' && fourthT === 'X') {
                first.html('O');
                stopTurn(1);
            } else if (secondT === 'X' && fifthT === 'O' && sixthT === 'X') {
                third.html('O');
                stopTurn(3);
            } else if (firstT === 'X' && fifthT === 'X' && ninthT === 'O') {
                seventh.html('O');
                stopTurn(7);
            } else {
                randomMove();
            }

        } else if (app.moves.length < 6) {
            if (ninthT === 'X' && fifthT === 'X' && secondT === 'X' && eighthT === 'O' && seventhT === '') {
                seventh.html('O');
                stopTurn(7);
            } else if (ninthT === 'X' && fifthT === 'X' && fourthT === 'X' && secondT === '') {
                second.html('O');
                stopTurn(2);
            } else {
                randomMove();

            }

        } else if (app.moves.length < 8 && app.moves.length >= 6) {
            if (ninthT === 'X' && fifthT === 'X' && secondT === '' && eighthT === '' && sixthT !== '') {
                eighth.html('O');
                app.moves.push(8);
            } else {
                randomMove();
            }
        }
        app.humanMove = true;
    }

    var counter = 0;

    function stopThree(num, param1, param2) {
        var block = $('#' + num);
        var block1 = $('#' + (num + param1));
        var block2 = $('#' + (num + param2));
        if (compTurn) {
            if (block.text() === block1.text() && block.text() === 'O' && block1.text() === 'O' && block2.text() === '') {
                block2.html('O');
                stopTurn(num);
            } else if (block.text() === block2.text() && block.text() === 'O' && block2.text() === 'O' && block1.text() === '') {
                block1.html('O');
                stopTurn(num);
            }
        } else {
            if (!app.humanMove) {
                goForWin();
            };
            if (!app.stoppage) {
                if (block.text() === block1.text() && block.text() === 'X' && block1.text() === 'X' && block2.text() === '') {
                    block2.html('O');
                    app.moves.push(block2.attr('id'))
                    stopTurn(num);
                } else if (block.text() === block2.text() && block.text() === 'X' && block2.text() === 'X' && block1.text() === '') {
                    block1.html('O');
                    app.moves.push(block1.attr('id'))
                    stopTurn(num);
                } else {
                    if (app.moves.length <= app.turnCount) {
                        for (var i = app.moves.length - 1; i >= 0; i--) {
                            if (app.moves[i] !== num && app.moves.length <= app.turnCount) {
                                app.moves.push(num);
                            }
                        };
                    };
                    counter += 1;
                    if ((num === 2 || num === 4 || num === 6 || num === 8) && counter === 2) {
                        compMove();
                    } else if ((num === 1 || num === 3 || num === 7 || num === 9) && counter === 3) {
                        compMove();
                    } else if (num === 5 && counter === 4) {
                        compMove();
                    }
                }
            }
        }
    }

    function row(num, param1, param2) {
        stopThree(num, param1, param2);
    }

    function column(num, param1, param2) {
        stopThree(num, param1, param2);
    }

    function diagonal(num, param1, param2) {
        stopThree(num, param1, param2);
    }

    function checkId(id) {
        if (id === 1) {
            row(id, 1, 2);
            column(id, 3, 6);
            diagonal(id, 4, 8);
        } else if (id === 2) {
            row(id, -1, 1);
            column(id, 3, 6);
        } else if (id === 3) {
            row(id, -1, -2);
            column(id, 3, 6);
            diagonal(id, 2, 4);
        } else if (id === 4) {
            row(id, 1, 2);
            column(id, -3, 3);
        } else if (id === 5) {
            row(id, -1, 1);
            column(id, -3, 3);
            diagonal(id, -4, 4);
            diagonal(id, -2, 2);
        } else if (id === 6) {
            row(id, -1, -2);
            column(id, -3, 3);
        } else if (id === 7) {
            row(id, 1, 2);
            column(id, -6, -3);
            diagonal(id, -2, -4);
        } else if (id === 8) {
            row(id, -1, 1);
            column(id, -6, -3);
        } else {
            row(id, -1, -2);
            column(id, -6, -3);
            diagonal(id, -4, -8);
        }
    }

    checkId(id);

}