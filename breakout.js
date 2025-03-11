const canvas = document.getElementById("breakoutCanvas");
const ctx = canvas.getContext("2d");

const ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
    dx: 3,
    dy: -3
};

const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 10,
    width: 100,
    height: 10,
    speed: 5
};

const bricks = [];
const brickRowCount = 5;
const brickColumnCount = 7;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let score = 0;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.fillStyle = "blue";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.status === 1) {
                ctx.fillStyle = "green";
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            }
        });
    });
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }

    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    if (ball.y + ball.radius > canvas.height) {
        resetBreakoutGame();
    }

    if (
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy = -ball.dy;
    }

    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.status === 1) {
                if (
                    ball.x > brick.x &&
                    ball.x < brick.x + brick.width &&
                    ball.y > brick.y &&
                    ball.y < brick.y + brick.height
                ) {
                    ball.dy = -ball.dy;
                    brick.status = 0;
                    score++;
                    document.querySelector(".breakout .score").textContent = `Score: ${score}`;
                }
            }
        });
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawBricks();
    update();

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && paddle.x > 0) {
        paddle.x -= paddle.speed;
    }
    if (event.key === "ArrowRight" && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddle.speed;
    }
});

function resetBreakoutGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 30;
    ball.dx = 3;
    ball.dy = -3;
    paddle.x = canvas.width / 2 - 50;
    score = 0;
    document.querySelector(".breakout .score").textContent = `Score: ${score}`;

    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {
                x: c * (brickWidth + brickPadding) + brickOffsetLeft,
                y: r * (brickHeight + brickPadding) + brickOffsetTop,
                width: brickWidth,
                height: brickHeight,
                status: 1
            };
        }
    }
}

resetBreakoutGame();
gameLoop();
