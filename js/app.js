// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();    
};


Enemy.prototype.reset = function() {

    var starterValues = {
        "xStartIni": [
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
    
    var xStartRandom = starterValues.xStartIni[Math.floor(Math.random() * starterValues.xStartIni.length)];
    this.direction = xStartRandom.direction;
    this.sprite = xStartRandom.image;
    this.x = xStartRandom.xStart;
    this.y = starterValues.yStartIni[Math.floor(Math.random() * starterValues.yStartIni.length)];
    this.speed = starterValues.speedIni[Math.floor(Math.random() * starterValues.speedIni.length)];
    
    
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    if (this.direction === "forward") {
        this.x = this.x+(dt*this.speed);
        if (this.x >= 550) {
            this.reset();
        }
    } else {
        this.x = this.x-(dt*this.speed);
        if (this.x <= -150) {
            this.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if ((this.x <= (player.x + 20)) && (this.x >= (player.x - 20)) && (this.y <= player.y + 20) && (this.y >= (player.y - 20)))
    {
        player.reset();
        playerLives--;
        if (playerLives === 0) {
            console.log("Game Over");
        }
    }
    
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.reset();
};

Player.prototype.reset = function(keyPressed) {
    var xStart = [0, 100, 200, 300, 400];
    var yStart = [295,380];
    this.x = xStart[Math.floor(Math.random() * xStart.length)];
    this.y = yStart[Math.floor(Math.random() * yStart.length)];
}

Player.prototype.update = function(keyPressed) {
    
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
    }
    //console.log(this.x,this.y); //da eliminare
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {    
    this.update(keyPressed);
};

Player.prototype.levelUp = function() {
    
    if (gameLevel <= 4) {
        gameLevel++;
        player.reset();
        allEnemies.push(new Enemy());
    } else {
        player.reset();
        console.log("Vinto " + gameLevel);
        //canvasGraph("vinto");
        allEnemies = [];
    }
    
};

////
/*
var Canvas = function() {
    var c = document.getElementsByTagName("canvas");
    var ctx = c.getContext("2d");
    console.log(ctx);
    
    //var c = document.getElementById("myCanvas");
    //var ctx = c.getContext("2d");
}
*/
console.log(this);




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var gameLevel = 1;
var playerLives = 3;
//var canvasInfo = new Canvas();
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