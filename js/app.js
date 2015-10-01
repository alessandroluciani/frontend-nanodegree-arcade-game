// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
        
    var starterValues = {
        "xStartIni": [
            {
                "direction": "forward",
                "xStart": -100
            },
            {
                "direction": "backward",
                "xStart": 500
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
            200
        ]
    };
    
    var xStartRandom = starterValues.xStartIni[Math.floor(Math.random() * starterValues.xStartIni.length)];
    this.direction = xStartRandom.direction;
    this.x = xStartRandom.xStart;
    this.y = starterValues.yStartIni[Math.floor(Math.random() * starterValues.yStartIni.length)];
    this.speed = starterValues.speedIni[Math.floor(Math.random() * starterValues.speedIni.length)];
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    if (this.direction === "forward") {
        this.x = this.x+(dt*this.speed);
    } else {
        this.x = this.x-(dt*this.speed);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    var xStart = [0, 100, 200, 300, 400];
    var yStart = [295,380];
    this.x = xStart[Math.floor(Math.random() * xStart.length)];
    this.y = yStart[Math.floor(Math.random() * yStart.length)];
};  

Player.prototype.update = function(keyPressed) {
    
    switch(keyPressed) {
        case 'left':
            if (this.x-100 >= 0) {
                this.x = this.x-100;
            };
            break;
        case 'up':
            if (this.y-85 >= 40) { //da ritoccare per l'arrivo del player alla zona dell'acqua
                this.y = this.y-85;
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();


var allEnemies = [enemy1,enemy2,enemy3];
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