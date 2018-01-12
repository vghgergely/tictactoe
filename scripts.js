$(document).ready(function () {
    var currTurn = true;
    // true: player false: computer
    var player = "";
    var comp = "";
    // these 2 should be <i fa> things and text should be innerHTML instead, hopefully display is not getting fucked up, the table is perfect as it is
    var playing = false;
    var table = [];
    var playerScore = 0;
    var compScore = 0;
    
    function checkIfWon() {
        //SOMEHOW MAKE THE FUCKING X OR O GET DRAWN BEFORE ALERT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        for (i = 0; i < table.length; i++) {
            if ((table[i][0] != "") && (table[i][0] == table[i][1]) && (table[i][1] == table[i][2])) {
                
                alert("win procced horizontal, line: " + table[i][0]);
                currTurn ? playerScore++ : compScore++;
                $("#reset").trigger("click");
                
                return true;
            }
            if ((table[0][i] != "") && (table[0][i] == table[1][i]) && (table[1][i] == table[2][i])) {
                alert("win procced vertical, line: " + table[0][i]);
                currTurn ? playerScore++ : compScore++;
                $("#reset").trigger("click");
                return true;
            }
        }
        if (table[0][0] != "" && table[0][0] == table[1][1] && table[1][1] == table[2][2]) {
            alert("win procced top left - bot right: " + table[0][0]);
            currTurn ? playerScore++ : compScore++;
            $("#reset").trigger("click");
            return true;
        }
        if (table[2][0] != "" && table[2][0] == table[1][1] && table[1][1] == table[0][2]) {
            alert("win procced top right - bot left" + table[1][1]);
            currTurn ? playerScore++ : compScore++;
            $("#reset").trigger("click");
            return true;
        }
        
    }

    function updateScores() {
        $("#playerScore").text(playerScore);
        $("#compScore").text(compScore);
    }

    function getNextMove() {
        for (i = 0; i < table.length; i++) {
            for (j = 0; j < table.length; j++) {
                if (table[i][j] == "") {
                    table[i][j] = comp;
                    var id = i.toString() + j.toString();

                    
                    $('#' + id).text(comp);
                    checkIfWon();
                    updateScores();
                    //if (checkIfWon()) {
                    //    compScore++;
                    //    $("#compScore").text(parseInt($("#compScore").text()) + 1);
                    //}
                    currTurn = !currTurn;
                    
                    
                    return;
                }
            }
        }
    }

    function afterWin() {
        //SOME GLOWING AFTER WINNING AND STUFF SO IT LOOKS NICE
    }

    $("#start").click(function () {
        
        $(".chooser").toggle();
        table = [["", "", ""], ["", "", ""], ["", "", ""]];
        
    })

    $("#reset").click(function() {
        table = [["", "", ""], ["", "", ""], ["", "", ""]];
        $(".cell").text("");
        
    });

    $("#hardReset").click(function() {
        table = [["", "", ""], ["", "", ""], ["", "", ""]];
        $(".cell").text("");
        playerScore = 0;
        compScore = 0;
        
        $("#startMenu").show();
        $(".chooser").hide();
        $(".grid").hide();
        $("#scores").hide();
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
        updateScores();
        playing = true;
    })
    
        
    

    $(".cell").click(function () {
        if(playing){
            var cell = $(this);
            if (cell.text() == "") {
            
                var coords = this.id.toString();
                console.log(coords);
                var i = parseInt(coords[0]);
                var j = parseInt(coords[1]);
                console.log("i: " + i + " j: " + j);
                console.log(table[i][j]);
                if (currTurn) {
                    table[i][j] = player;
                    cell.text(player);
                    //setTimeout(function() { alert("meme");
                    //    reset();
                    //}, 1000);
                }
           

                console.log(table);
                if (!checkIfWon()) {
                    currTurn = !currTurn;
                    getNextMove();
                    console.log(table);
                }
                updateScores();
                //else {
                //    $("#playerScore").text(parseInt($("#playerScore").text()) + 1);
                //}

            }
        }
    })
})