const canvas = document.getElementById("flappyCanvas");
const ctx = canvas.getContext("2d");

const bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.6,
    lift: -10,
    velocity: 0
};

const pipes = [];
const pipeWidth = 40;
const pipeGap = 100;
const pipeFrequency = 90;
let frames = 0;
let score = 0;

function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
    });
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        resetFlappyGame();
    }
}

function updatePipes() {
    if (frames % pipeFrequency === 0) {
        const top = Math.random() * (canvas.height - pipeGap - 100) + 50;
        pipes.push({ x: canvas.width, width: pipeWidth, top: top, bottom: canvas.height - top - pipeGap });
    }

    pipes.forEach(pipe => {
        pipe.x -= 2;

        if (pipe.x + pipe.width < 0) {
            pipes.shift();
            score++;
            document.querySelector(".flappy-bird .score").textContent = `Score: ${score}`;
        }

        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
        ) {
            resetFlappyGame();
        }
    });
}

function resetFlappyGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes.length = 0;
    score = 0;
    document.querySelector(".flappy-bird .score").textContent = `Score: ${score}`;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();
    drawPipes();
    updateBird();
    updatePipes();

    frames++;
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", () => {
    bird.velocity = bird.lift;
});

gameLoop();
