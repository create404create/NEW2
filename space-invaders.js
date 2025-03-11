const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 20,
    speed: 5
};

const bullets = [];
const enemies = [];
let score = 0;

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
    });
}

function drawEnemies() {
    ctx.fillStyle = "green";
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, 30, 20);
    });
}

function update() {
    bullets.forEach((bullet, index) => {
        bullet.y -= 5;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });

    enemies.forEach((enemy, index) => {
        enemy.y += 1;
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }
    });

    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + 30 &&
                bullet.x + 5 > enemy.x &&
                bullet.y < enemy.y + 20 &&
                bullet.y + 10 > enemy.y
            ) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                score++;
                document.querySelector(".space-invaders .score").textContent = `Score: ${score}`;
            }
        });
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawBullets();
    drawEnemies();
    update();

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    }
    if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (event.key === " ") {
        bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y });
    }
});

function resetSpaceGame() {
    player.x = canvas.width / 2 - 25;
    bullets.length = 0;
    enemies.length = 0;
    score = 0;
    document.querySelector(".space-invaders .score").textContent = `Score: ${score}`;
}

setInterval(() => {
    enemies.push({ x: Math.random() * (canvas.width - 30), y: 0 });
}, 1000);

gameLoop();
