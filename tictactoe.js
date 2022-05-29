// Visualize the board to make it easier to think through the possible winning combinations
var board = [
    "0", "0", "0",
    "0", "0", "0",
    "0", "0", "0",
];

var stop = false; // Prevent the user from interacting with the board once the game is over

// Create objects with every possible winning combination on the board. (vertical, horizontal, diagonal)

const winningCombos = [
    { a: 0, b: 1, c: 2 },
    { a: 3, b: 4, c: 5 },
    { a: 6, b: 7, c: 8 },
    { a: 0, b: 3, c: 6 },
    { a: 1, b: 4, c: 7 },
    { a: 2, b: 5, c: 8 },
    { a: 0, b: 4, c: 8 },
    { a: 2, b: 4, c: 6 },
];

// Allow user to interact with the DOM
$(document).on('click', '.square', function () {
    if ($(this).html() !== "" || stop)
        return;

    $(this).html("X");
    var id = $(this).prop('id');
    board[parseInt(id)] = "X";

    checkBoard(); // Check to see if the player has won
    counter(); // Allow the computer to make a counter move if the player has not already won
    if (!stop)
        checkBoard(); // Check to see if the bot has won
});

// Check to see if either player has won
function checkBoard() {
    for (var i = 0; i < winningCombos.length; i++) { // Loop through each possible winning combination
        if (board[winningCombos[i].a] == board[winningCombos[i].b] && board[winningCombos[i].b] == board[winningCombos[i].c] && board[winningCombos[i].a] !== "0") {
            stop = true;
        }
    }
}

function counter() {

    if (stop) // Escape function if the game is over
        return;

    // Check for possible combinations for the computer to win the game
    for (var j = 0; j < winningCombos.length; j++) {
        var count = 0;
        var empty = -1;

        if (board[winningCombos[j].a] == "O")
            count++;
        else
            empty = winningCombos[j].a;

        if (board[winningCombos[j].b] == "O")
            count++;
        else
            empty = winningCombos[j].b;

        if (board[winningCombos[j].c] == "O")
            count++;
        else
            empty = winningCombos[j].c;

        if (count == 2 && board[empty] == "0") { // Two of the three slots contain "O"s *and* the third spot is empty
            board[empty] = "O";
            $(".square#" + empty).html("O");
            return; // Escape the function if a letter is placed
        }
    }

    // Check for places in which the player could possbily win the game and prevent them from winning
    for (var k = 0; k < winningCombos.length; k++) {
        var count = 0;
        var empty = 0;

        if (board[winningCombos[k].a] == "X")
            count++;
        else
            empty = winningCombos[k].a;

        if (board[winningCombos[k].b] == "X")
            count++;
        else
            empty = winningCombos[k].b;

        if (board[winningCombos[k].c] == "X")
            count++;
        else
            empty = winningCombos[k].c;

        if (count == 2 && board[empty] == "0") { // Two of the three slots contain "X"s *and* the third spot is empty
            board[empty] = "O";
            $(".square#" + empty).html("O");
            return; // Escape the function if a letter is placed
        }
    }

    // If neither of these applies, place a letter in a random place

    var rand = Math.floor(Math.random() * 8);

    if (board.indexOf("0") == -1) { // Escape function and prevent infinite loop if there are no empty spaces.
        stop = true;
        return;
    }

    while (board[rand] !== "0") { // If the space is not empty, loop
        rand++; // Move to the next space
        if (rand == 9) // Prevent an infinite loop
            rand = 0;
    }

    board[rand] = "O";
    $(".square#" + rand).html("O");
}