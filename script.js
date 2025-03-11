// Rock Paper Scissors Game Logic
let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = "";

    if (playerChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You win!";
        playerScore++;
    } else {
        result = "Computer wins!";
        computerScore++;
    }

    // Update result and score
    document.querySelector(".rock-paper-scissors .result").textContent = 
        `You chose ${playerChoice}, Computer chose ${computerChoice}. ${result}`;
    document.querySelector(".rock-paper-scissors .score").textContent = 
        `Score: You ${playerScore} - ${computerScore} Computer`;
}

function resetRPSGame() {
    playerScore = 0;
    computerScore = 0;
    document.querySelector(".rock-paper-scissors .result").textContent = 
        "Choose an option to play!";
    document.querySelector(".rock-paper-scissors .score").textContent = 
        "Score: You 0 - 0 Computer";
}
