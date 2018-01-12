$(document).ready(function () {
    var currTurn = true;
    var starting = true;
    // true: player false: computer
    var player = "";
    var comp = "";
    // these 2 should be <i fa> things and text should be innerHTML instead, hopefully display is not getting fucked up, the table is perfect as it is
    var playing = false;
    var table = [];
    var playerScore = 0;
    var compScore = 0;
    var won = false;
    
   

    function updateScores() {
        $("#playerScore").text(playerScore);
        $("#compScore").text(compScore);
    }

    

    function checkIfWon(currTurn) {
        console.log("DURING CHECKIFWON, CURRTURN: " + currTurn);
        //SOMEHOW MAKE THE FUCKING X OR O GET DRAWN BEFORE ALERT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        for (i = 0; i < table.length; i++) {
            if ((table[i][0] != "") && (table[i][0] == table[i][1]) && (table[i][1] == table[i][2])) {

                alert("win procced horizontal, line: " + table[i][0]);
                currTurn ? playerScore++ : compScore++;

                won = true;
                return true;
            }
            if ((table[0][i] != "") && (table[0][i] == table[1][i]) && (table[1][i] == table[2][i])) {
                alert("win procced vertical, line: " + table[0][i]);
                currTurn ? playerScore++ : compScore++;

                won = true;
                return true;
            }
        }
        if (table[0][0] != "" && table[0][0] == table[1][1] && table[1][1] == table[2][2]) {
            alert("win procced top left - bot right: " + table[0][0]);
            currTurn ? playerScore++ : compScore++;

            won = true;
            return true;
        }
        if (table[2][0] != "" && table[2][0] == table[1][1] && table[1][1] == table[0][2]) {
            alert("win procced top right - bot left" + table[1][1]);
            currTurn ? playerScore++ : compScore++;

            won = true;
            return true;
        }

    }

    function afterWin() {
        //SOME GLOWING AFTER WINNING AND STUFF SO IT LOOKS NICE
    }

    function reset() {
        table = [["", "", ""], ["", "", ""], ["", "", ""]];
        $(".cell").text("");
        won = false;
    }

    $("#start").click(function () {
        
        $(".chooser").toggle();
        table = [["", "", ""], ["", "", ""], ["", "", ""]];
        
    })

    $("#reset").click(function() {
        table = [["", "", ""], ["", "", ""], ["", "", ""]];
        $(".cell").text("");
        playerScore = 0;
        compScore = 0;
        updateScores();
        won = false;
    });

    $("#hardReset").click(function() {
        table = [["", "", ""], ["", "", ""], ["", "", ""]];
        $(".cell").text("");
        playerScore = 0;
        compScore = 0;
        won = false;


        $("#startMenu").show();
        $(".chooser").hide();
        $(".grid").hide();
        $("#scores").hide();
        $("#resBtns").hide();
    })

    $(".chooserBtn").click(function() {
        if (this.id == "X") {
            player = "X";
            comp = "O";
        } else {
            player = "O";
            comp = "X";
        }
        
        $(".chooser").show();
        $("#startMenu").hide();
        $(".grid").show();
        $("#scores").show();
        $("#resBtns").show();
        updateScores();
        playing = true;
    })


    $(".cell").click(function() {
        if (!won) {
            var cell = $(this);
            if (cell.text() == "") {

                var coords = this.id.toString();

                var i = parseInt(coords[0]);
                var j = parseInt(coords[1]);

                if (currTurn) {
                    table[i][j] = player;
                    cell.text(player);


                }

                setTimeout(checkIfWon, 1, currTurn);
                //console.log(table);
                setTimeout(function() {
                        if (!won) {
                            currTurn = !currTurn;
                            getNextMove();
                        } else {
                            reset();
                        }
                        updateScores();
                    },
                    300);


            }
        }
    });

    function getNextMove() {

        for (i = 0; i < table.length; i++) {
            for (j = 0; j < table.length; j++) {
                if (table[i][j] == "") {
                    table[i][j] = comp;
                    var id = i.toString() + j.toString();


                    $('#' + id).text(comp);

                    
                    setTimeout(checkIfWon, 1, currTurn);

                    setTimeout(function () {
                        if (won) {
                            reset();
                            updateScores();
                        }
                    }, 300);
                    currTurn = !currTurn;
                    updateScores();



                    return;
                }
            }
        }
    }
})