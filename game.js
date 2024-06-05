window.onload = function() {
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('restartButton').addEventListener('click', restartGame);
}

let gameDuration = 180;
let gameInterval;
let timeRemaining;
let worms = [];
let wormsDestroyed = 0;
let score = 0;
let hiscore = 0;

//sound files 
const startingMusic = new Audio('./music/startingMusic.mp3');
const endingMusic = new Audio('./music/endingMusic.mp3');
const happySound = new Audio('./music/happyCatch.wav');
const unhappySound = new Audio('./music/unhappyCatch.mp3');

//starts the game   written with assistance by chatgpt3.5
function startGame() {
    const timeSelect = document.getElementById('timeSelect');
    gameDuration = parseInt(timeSelect.value);
    timeRemaining = gameDuration;

    //disables both start button and restart button written with assistance by chatgpt3.5
    document.getElementById('startButton').disabled = true; 
    document.getElementById('restartButton').disabled = false; 

    startingMusic.play(); 
    Example3();
    gameInterval = setInterval(updateGameTimer, 1000); 
}
//restart the game
function restartGame() {
    clearInterval(gameInterval);
    startingMusic.pause(); 
    endingMusic.play();
    const ctx = document.getElementById('gameCanvas').getContext('2d');
    ctx.clearRect(0, 0, 1200, 800);
    worms = []; 
    wormsDestroyed = 0; 
    score = 0; 
    document.getElementById('scoreBoard').innerText = `Score: ${score}`;

    //written with assistance by chatgpt3.5
    document.getElementById('startButton').disabled = false;
    document.getElementById('restartButton').disabled = true;
}
//when end music finishes, reset and restart the game via init()
endingMusic.addEventListener('ended', function() {
    endingMusic.currentTime = 0; 
    init(); 
});

//updates timer, decreases remaining time, clears game interval to stop the game loop, 
//informs  player that the game has ended and if required, informs of hi score
function updateGameTimer() {
    timeRemaining--;
    if (timeRemaining <= 0) {
        clearInterval(gameInterval);
        alert("Game Over!");
        if (hiscore < score) {
            hiscore = score;
            const ctx = document.getElementById('gameCanvas').getContext('2d');
            ctx.fillStyle = 'red';
            ctx.font = '30px Open Sans';
            ctx.fillText("NEW HI SCORE: " + hiscore, (canvas.width / 2) - 100, canvas.height / 2);
        }
        document.getElementById('restartButton').disabled = true;
        document.getElementById('startButton').disabled = false;
    }
}
//loadts images, 
function Example3() {
    const characterSpriteSheet = new Image();
    characterSpriteSheet.src = "./assets/blank_character.png";
    characterSpriteSheet.onload = load;

    const backgroundImage = new Image();
    backgroundImage.src = "./assets/sandyBeach.png";
    backgroundImage.onload = load;

    //variables for images, canvas, number of worms to create
    const awaitLoadCount = 2;
    let loadCount = 0;
    let lastTimeStamp = 0;
    let tick = 0;
    let canvas;
    let ctx;
    let character;
    const wormCount = 5;

    function load() {
        loadCount++;
        if (loadCount >= awaitLoadCount) {
            init();
        }
    }

    function init() {
        canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');

        //creates the character object
        character = Character(
            characterSpriteSheet,
            [64, 64],
            [
                [[0, 0], [64, 0], [128, 0], [192, 0]], // walk up
                [[256, 0], [320, 0], [384, 0], [448, 0]], // walk down
                [[0, 64], [64, 64], [128, 64], [192, 64]], // walk left
                [[256, 64], [320, 64], [384, 64], [448, 64]] // walk right
            ],
            1
        );
        character.init();
        //creates worms for the array
        for (let i = 0; i < wormCount; i++) {
            worms.push(createWorm());
        }

        document.addEventListener("keydown", doKeyDown);
        document.addEventListener("keyup", doKeyUp);

        window.requestAnimationFrame(run);
    }

    function run(timeStamp) {
        tick = (timeStamp - lastTimeStamp);
        lastTimeStamp = timeStamp;

        update(tick);
        draw();

        window.requestAnimationFrame(run);
    }
    //updates game state
    function update(tick) {
        character.update(tick);
        worms.forEach(worm => worm.update(tick));

        // Ensure only 5 worms at a time
        while (worms.length < 5) {
            worms.push(createWorm());
        }
    }
    
    function draw() {
        const ctx = document.getElementById('gameCanvas').getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, 1200, 800);
        worms.forEach(worm => worm.draw(ctx));
        character.draw(ctx);
    }
    //looks after key input and characters attempts to grab worm 
    function doKeyDown(e) {
        e.preventDefault();
        if (character) {
            character.doKeyInput(e.key, true);
            if (e.key === ' ') {
                character.grabWorm(worms);
            }
        }
    }
    
    function doKeyUp(e) {
        e.preventDefault();
        if (character) character.doKeyInput(e.key, false);
    }

    function Character(spritesheet, spriteSize, spriteFrames, spriteScale) {
        return {
            spriteSheet: spritesheet,
            spriteFrameSize: spriteSize,
            spriteFrames: spriteFrames,
            spriteScale: spriteScale,
            spriteCanvasSize: spriteSize,
            animationTrack: 0,
            animationFrame: 0,
            frameTime: 125,
            timeSinceLastFrame: 0,
            lastAction: "",
            position: [0, 0],
            direction: [0, 0],
            velocity: 0.2,
            init() {
                this.spriteCanvasSize = [
                    this.spriteFrameSize[0] * this.spriteScale,
                    this.spriteFrameSize[1] * this.spriteScale
                ];
            },
            action(action) {
                if (action === this.lastAction) return;
                switch (action) {
                    case "moveLeft":
                        this.animationTrack = 2;
                        this.animationFrame = 0;
                        this.direction[0] = -this.velocity;
                        break;
                    case "moveRight":
                        this.animationTrack = 3;
                        this.animationFrame = 0;
                        this.direction[0] = this.velocity;
                        break;
                    case "moveUp":
                        this.animationTrack = 0;
                        this.animationFrame = 0;
                        this.direction[1] = -this.velocity;
                        break;
                    case "moveDown":
                        this.animationTrack = 1;
                        this.animationFrame = 0;
                        this.direction[1] = this.velocity;
                        break;
                    case "noMoveHorizontal":
                        this.direction[0] = 0;
                        this.animationFrame = 0;
                        break;
                    case "noMoveVertical":
                        this.direction[1] = 0;
                        this.animationFrame = 0;
                        break;
                    default:
                        this.direction = [0, 0];
                        break;
                }
                this.lastAction = action;
            },
            update(tick) {
                this.timeSinceLastFrame += tick;
                if (this.timeSinceLastFrame >= this.frameTime) {
                    this.timeSinceLastFrame = 0;
                    if (this.direction[0] !== 0 || this.direction[1] !== 0) {
                        this.animationFrame = (this.animationFrame + 1) % this.spriteFrames[this.animationTrack].length;
                    }
                }
                this.position[0] += this.direction[0] * tick;
                this.position[1] += this.direction[1] * tick;
            },
            draw(context) {
                context.drawImage(
                    this.spriteSheet,
                    this.spriteFrames[this.animationTrack][this.animationFrame][0],
                    this.spriteFrames[this.animationTrack][this.animationFrame][1],
                    this.spriteFrameSize[0],
                    this.spriteFrameSize[1],
                    this.position[0],
                    this.position[1],
                    this.spriteCanvasSize[0],
                    this.spriteCanvasSize[1]
                );
            },
            doKeyInput(e, isKeydown = true) {
                switch (e) {
                    case "w":
                        if (isKeydown) this.action("moveUp");
                        else this.action("noMoveVertical");
                        break;
                    case "a":
                        if (isKeydown) this.action("moveLeft");
                        else this.action("noMoveHorizontal");
                        break;
                    case "s":
                        if (isKeydown) this.action("moveDown");
                        else this.action("noMoveVertical");
                        break;
                    case "d":
                        if (isKeydown) this.action("moveRight");
                        else this.action("noMoveHorizontal");
                        break;
                    case " ":
                        if (isKeydown) this.grabWorm(worms);
                        break;
                    default:
                        if (!isKeydown) this.action("stop");
                        break;
                }
            },

                //function allows for character catching worms for which points are given -- written with assistance by chatgpt3.5
            grabWorm(worms) {
                for (let i = 0; i < worms.length; i++) {
                    const worm = worms[i];
                    const dx = this.position[0] + this.spriteCanvasSize[0] / 2 - worm.x;
                    const dy = this.position[1] + this.spriteCanvasSize[1] / 2 - worm.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < worm.radius + this.spriteCanvasSize[0] / 2) {
                        // Worm is caught
                        happySound.play();
                        // Remove the worm from the array (worm will disappear)
                        worms.splice(i, 1);
                        wormsDestroyed++; // Increment the count of destroyed worms
                        score++; // adds to the score
                        document.getElementById('scoreBoard').innerText = `Score: ${score}`;
                        // Immediately add a new worm to maintain a minimum of 5
                        worms.push(createWorm());
                        break;
                    } else {
                        // Worm is not caught
                        unhappySound.play();
                    }
                }
            }
        };
    }
    //creates worm allowing for behaviour -- written with asistance by chatgpt3.5
    function createWorm() {
        const worm = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 0, // Start hidden
            maxRadius: 25, // Increased size
            stage: 0,
            stageTime: 0,
            stageDurations: [2000, 5000, 2000], // 2 seconds appearing, 5 seconds visible, 2 seconds disappearing
            //worm speed is random
            speedX: Math.random() * 2 - 1, 
            speedY: Math.random() * 2 - 1, 
            update(tick) {
                this.stageTime += tick;
                if (this.stageTime >= this.stageDurations[this.stage]) {
                    this.stage = (this.stage + 1) % this.stageDurations.length;
                    this.stageTime = 0;
                    if (this.stage === 0) {
                        // Reset position, radius, and speed when reappearing
                        this.x = Math.random() * canvas.width;
                        this.y = Math.random() * canvas.height;
                        this.radius = 0;
                        this.speedX = Math.random() * 2 - 1;
                        this.speedY = Math.random() * 2 - 1;
                    }
                }

                if (this.stage === 0) {
                    // Appearing (growing)
                    this.radius = this.maxRadius * (this.stageTime / this.stageDurations[this.stage]);
                } else if (this.stage === 1) {
                    // Fully visible and moving
                    this.radius = this.maxRadius;
                    this.x += this.speedX;
                    this.y += this.speedY;

                    // Boundary wall collision detection and response
                    if (this.x <= this.radius || this.x >= canvas.width - this.radius) {
                        this.speedX *= -1;
                    }
                    if (this.y <= this.radius || this.y >= canvas.height - this.radius) {
                        this.speedY *= -1;
                    }

                } else if (this.stage === 2) {
                    // Disappearing (shrinking)
                    this.radius = this.maxRadius * (1 - this.stageTime / this.stageDurations[this.stage]);
                }
            },
            draw(context) {
                if (this.radius > 0) {
                    const gradient = context.createRadialGradient(this.x, this.y, this.radius * 0.5, this.x, this.y, this.radius);
                    gradient.addColorStop(0, "rgba(255, 204, 153, 1)"); 
                    gradient.addColorStop(1, "rgba(255, 153, 51, 0.9)"); 
                    context.fillStyle = gradient;
                    context.beginPath();
                    context.arc(this.x, this.y, this.radius, 0, Math.PI, true); 
                    context.fill();
                    context.closePath();
                }
            }
        };
        return worm;
    }
}
