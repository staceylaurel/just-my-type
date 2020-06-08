$(document).ready(function () {

    let sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'
    ];

    //declaring variables to use in the game elsewhere
    let upperKeys = $("#keyboard-upper-container");
    let lowerKeys = $("#keyboard-lower-container");
    let sentencesIndex = 0;
    let letterIndex = 0;
    let currentSentence = sentences[sentencesIndex];
    let currentLetter = currentSentence[letterIndex];
    let startTime = Date.now();
    let mistakes = 0;

    //hiding the uppercase letter keyboard
    upperKeys.hide();

    //when the shift key is pressed the uppercase keyboard is toggled to and when is released the lower case keyboard is toggled back to
    $(document).keydown(function (e) {
        if (e.which === 16) {
            $(upperKeys).show();
            $(lowerKeys).hide();
        }
    });

    //when key on either keyboard is pressed it is highlighted to show current key pressed
    $(document).keyup(function (e) {
        $(".highlight").removeClass("highlight")
        if (e.which === 16) {
            $(lowerKeys).show();
            $(upperKeys).hide();

        }
    });

    $("#sentence").text(currentSentence);
    $("#target-letter").text(currentLetter);

    $(document).keypress(function (e) {
        //moves highlighted tab across the top of the page when a key on either uppercase or lower case board is pressed
        $('#' + e.which).addClass('highlight');
        $('#yellow-block').css({ marginLeft: '+=17.5px' });
        //if mean corrects and green ok check mark appears when currentLetter equales target-letter
        if (e.which === currentSentence.charCodeAt(letterIndex)) {
            $("#feedback").append('<span class="glyphicon glyphicon-ok"></span>')
            //else means incorrect and red x appears when currentLetter equales target-letter
        } else {
            $("#feedback").append('<span class="glyphicon glyphicon-remove"></span>')
            mistakes++;
        }
        //shows next letter in the sentence everytime a key is pressed
        letterIndex++;

        //When current sentence ends page refresshes and everything starts back at position 0 for all returns
        if (letterIndex === currentSentence.length) {
            $('#feedback').empty();
            //yellow tab at top starts back at first letter
            $('#yellow-block').css({ marginLeft: '0px' });
            letterIndex = 0;
            //next sentence in the array is toggled to and is shown until last sentence in the array is shown
            sentencesIndex++;
            if (sentencesIndex === sentences.length) {
                console.log('endofgame');
                //start timing the game speed when page loads
                let endTime = Date.now();
                let minutesPlayed = (endTime - startTime) / 1000 / (60);
                //counts how many correct current letters are matched with target-letter
                let wpm = Math.abs(Math.floor(54 / minutesPlayed - 2 * mistakes));
                //stops game from beging played since last letter on last sentenced was typed
                $(document).off();
                //in document show how many wpm were correctly typed during game time
                $('#sentence').text('You typed ' + wpm + ' Do you want to play again?');
                //clears games and when button is [ushed game restarts from sentence 0 currentLetter 0
                $('#yellow-block').remove();
                $('#target-letter').empty().append('<button>Start Over</button>').click(function () {
                    window.location.reload();
                });

                return;
            }
            currentSentence = sentences[sentencesIndex];
            $("#sentence").text(currentSentence);
        }

        currentLetter = currentSentence[letterIndex];
        $('#target-letter').text(currentLetter);
    })
})


