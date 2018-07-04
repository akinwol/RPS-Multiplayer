// Initialize Firebase
var config = {
    apiKey: "AIzaSyB3JHcqQUrPqWf3MtPOsu0_1xrY9V1Hoac",
    authDomain: "rps-multiplayer-fa3d6.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-fa3d6.firebaseio.com",
    projectId: "rps-multiplayer-fa3d6",
    storageBucket: "rps-multiplayer-fa3d6.appspot.com",
    messagingSenderId: "1090070127101"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();


// On click of add a name need to capture and initialize the follwong:
// name of player, losses of 0 wins of 0
// also put options of rock paper or scicors tot he game area 
// user cannot select anything until there is a second player 
var gamePlay = {
    rock: $("<p>").addClass("selection").attr("data-select", "rock").html("Rock <hr>"),
    paper: $("<p>").addClass("selection").attr("data-select", "paper").html("Paper <hr>"),
    scisors: $("<p>").addClass("selection").attr("data-select", "scisors").html("Scisors <hr>")

}

var playerOneExist = false
database.ref().once("value").then(function (snapshot) {
    var name = snapshot.child("players/1/name").val();
    var nameOrNot = snapshot.child("players/1").exists();
    console.log("try: " + name)
    console.log("exist: " + nameOrNot)
})


$("#start").on("click", function () {
    event.preventDefault();
    //  check to see if player one exist 
    database.ref().once("value").then(function (snapshot) {
        var pOneExist = snapshot.child("players/1").exists();

        if (pOneExist) {
            // check if p2 exists
            database.ref().once("value").then(function (snapshot) {
                var pTwoExist = snapshot.child("players/2").exists();
                if (pTwoExist) {
                    alert("player 2Exist")
                }
                else {
                    var playerNameTwo = $("#player-name").val().trim();

                    // why this doesnt work? is there another way to do this 
                    var players =
                    {
                        2: {
                            name: playerNameTwo,
                            losses: 0,
                            wins: 0
                        }
                    }

                    database.ref("players/2").set({
                        name: playerNameTwo,
                        losses: 0,
                        wins: 0
                    })

                };
            });


        }
        else {
            var playerName = $("#player-name").val().trim();


            var players =
            {
                1: {
                    name: playerName,
                    losses: 0,
                    wins: 0
                }
            }

            database.ref("players").set(players)
            console.log(playerName)

        }


    });



});

database.ref().on("value", function (snapshot) {

    if (snapshot.child("players/1").exists()) {
        console.log("it exist")

        var playerOne = snapshot.val().players[1].name;
        var playerOneLosses = snapshot.val().players[1].losses;
        var playerOneWins = snapshot.val().players[1].wins;
        var winLoss = $("<p>").html("Wins: " + playerOneWins + "<br> Losses: " + playerOneLosses)

        $("#game-area-one").append(gamePlay.rock, gamePlay.paper, gamePlay.scisors)

       
        $("#game-area-one").append(winLoss)

        $(".player-one-name").text(playerOne)
    }

    else {
        console.log("it doesnt")
    };

    if (snapshot.child("players/2").exists()) {
        console.log("player 2 exists ")

        var rock = $("<p>").addClass("selection").attr("data-select", "rock").html("Rock <hr>");
        var paper = $("<p>").addClass("selection").attr("data-select", "paper").html("Paper <hr>");
        var scisors = $("<p>").addClass("selection").attr("data-select", "scisors").html("Scisors <hr>");

        var playerTwo = snapshot.val().players[2].name;
        // $("#game-area-two").append(gamePlay.rock, gamePlay.paper, gamePlay.scisors)
        $("#game-area-two").append(rock,paper,scisors)


        $(".player-two-name ").text(playerTwo)


    }






});

$(document).on("click", ".selection", function () {

    // database.ref().set()
    alert($(this).attr("data-select"))
})

console.log(database.ref().child("players"))