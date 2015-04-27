app.checkWin = function() {

    var first = $('.game-block-first').html(),
        second = $('.game-block-second').html(),
        third = $('.game-block-third').html(),
        fourth = $('.game-block-fourth').html(),
        fifth = $('.game-block-fifth').html(),
        sixth = $('.game-block-sixth').html(),
        seventh = $('.game-block-seventh').html(),
        eighth = $('.game-block-eighth').html(),
        ninth = $('.game-block-ninth').html();

    function checkThree(num, param) {
        var idNum = $('#' + num).text();
        var idNumLess = $('#' + (num - param)).text();
        var idNumMore = $('#' + (num + param)).text();
        if ((idNum === idNumLess) && (idNum === idNumMore) && (idNum !== '')) {
            function changeColor(el) {
                el.css({
                    'background': 'white',
                    'color': '#EB1767'
                });
            };
            changeColor($('#' + num));
            changeColor($('#' + (num - param)));
            changeColor($('#' + (num + param)));
            return true;
        }
    }

    if (checkThree(2, 1) || checkThree(5, 1) || checkThree(8, 1) || checkThree(4, 3) || checkThree(5, 1) || checkThree(5, 3) || checkThree(6, 3) || checkThree(5, 4) || checkThree(5, 2)) {
        app.lose();
        return true;
    }

    var blocks = $('.game-block');

    function checkBlocks() {
        var counter = 0;
        for (var i = blocks.length - 1; i >= 0; i--) {
            if (blocks[i].innerHTML !== '') {
                counter += 1;
            }
        };
        if (counter === 9) {
            return true;
        } else {
            return false;
        }
    }

    if (checkBlocks()) {
        app.catScan();
    }
}