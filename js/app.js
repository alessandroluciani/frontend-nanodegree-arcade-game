// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Reset method used to start a single enemy istance.
    this.reset();    
};


Enemy.prototype.reset = function() {

    //Json structure used to prepare the properties for enemy object.
    //I will use js random method to change direction,StartIni,yStartIni and speedIni 
    var starterValues = {
        "StartIni": [
            {
                "direction": "forward",
                "xStart": -100,
                "image" : "images/enemy-bug.png"
            },
            {
                "direction": "backward",
                "xStart": 500,
                "image" : "images/enemy-bug-rev.png"
            }
        ],
        "yStartIni": [
            45,
            125,
            210
        ],
        "speedIni": [
            100,
            150,
            200,
            250,
            300
        ]
    };
    
    //Random values for single enemy istance.
    var StartRandom = starterValues.StartIni[Math.floor(Math.random() * starterValues.StartIni.length)];
    this.direction = StartRandom.direction;
    this.sprite = StartRandom.image;
    this.x = StartRandom.xStart;
    this.y = starterValues.yStartIni[Math.floor(Math.random() * starterValues.yStartIni.length)];
    this.speed = starterValues.speedIni[Math.floor(Math.random() * starterValues.speedIni.length)];
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //This "if" section let you to manage enemy with 2 different directions and starts.
    if (this.direction === "forward") {
        this.x = this.x+(dt*this.speed);
        if (this.x >= 550) {
            this.reset();
        };
    } else {
        this.x = this.x-(dt*this.speed);
        if (this.x <= -150) {
            this.reset();
        };
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //Checking collission player/enemy istance - Tolerance inside a square 30px*30px 
    if ((this.x <= (player.x + 30)) && (this.x >= (player.x - 30)) && (this.y <= player.y + 30) && (this.y >= (player.y - 30)))
    {
        sb.playerdie();        
    };
    
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    //Princess Poppy :)
    this.sprite = 'images/char-princess-girl.png'; 
    // Reset method used to start player istance.
    this.reset();
};

Player.prototype.reset = function(keyPressed) {
    var xStart = [0, 100, 200, 300, 400];
    var yStart = [295,380];
    //Random start position for Princess Poppy
    this.x = xStart[Math.floor(Math.random() * xStart.length)];
    this.y = yStart[Math.floor(Math.random() * yStart.length)];
};

Player.prototype.update = function(keyPressed) {
    
    //I use sb.status to control if the game is finished (win) or nolives (nowin)
    //and block the keyboard
    if ((sb.status !== "win") && (sb.status !== "nowin")) {
    
        switch(keyPressed) {
            case 'left':
                if (this.x-100 >= 0) {
                    this.x = this.x-100;
                };
                break;
            case 'up':
                if (this.y-85 >= 40) { 
                    this.y = this.y-85;
                } else {
                    this.levelUp();
                };
                break;
            case 'right':
                if (this.x+100 <= 400) {
                    this.x = this.x+100;
                };
                break;
            case 'down':
                if (this.y+85 <= 380) {
                    this.y = this.y+85;
                };
                break;
        };
        
    };
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {    
    this.update(keyPressed);
};

Player.prototype.levelUp = function() {
    sb.levelUp();
};

// Scoreboard Class to control points,lives and level and other :)
// levelUp method add 1 gameLevel,increase enemy istances by 1, add points (100points) and reset player
// playerdie method remove 1 playerlive, remove points (-50points) and reset player
// layerpoints method add points (100points) or remove point (-50points).
// render method render informations about level,points and lives and manage "you win" message or "game over"

var Scoreboard = function() {
    this.status = "play";
    this.reset();
};

Scoreboard.prototype.levelUp = function() {
    
    this.playerpoints('add');
    player.reset();
    
    if (this.gameLevel < this.maxLevel) {
        this.gameLevel++;
        allEnemies.push(new Enemy());
    } else {
        this.status = "win";
        allEnemies = [];
    };
    
};

Scoreboard.prototype.playerdie = function() {
    this.playerLives--;
    this.playerpoints('remove');
    player.reset();
    if (this.playerLives === 0) {
        this.status = "nowin";
        allEnemies = [];
    };
};

Scoreboard.prototype.playerpoints = function(action) {
    if (action === "add") {
        this.playerPoints=this.playerPoints+100;
    } else {
        this.playerPoints=this.playerPoints-50;
    };
};

Scoreboard.prototype.render = function() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("LEVEL : " + this.gameLevel,10,75);
    ctx.fillText("LIVES : " + this.playerLives,10,100);
    ctx.fillText("POINTS : " + this.playerPoints,10,125);
    
    if (this.status === "win") {
        ctx.font = "40px Arial";
        ctx.fillText('YOU WIN!', 150, 275);
    } else if (this.status === "nowin") {
        ctx.font = "40px Arial";
        ctx.fillText('GAME OVER!', 125, 275);
    };
};

Scoreboard.prototype.reset = function() {
    this.gameLevel = 1;
    this.maxLevel = 10;
    this.playerLives = 3;
    this.playerPoints = 0;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Scoreboard object
var sb = new Scoreboard();

var allEnemies = [new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});