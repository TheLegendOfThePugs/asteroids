var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");



var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;
 
var ASTROID_SPEED = 2;//0.8;
var PLAYER_SPEED = 1;
var PLAYER_TURN_SPEED = 0.04
var BULLET_SPEED = 10.5;
var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var splashTimer = 3;
var gameState = STATE_SPLASH;
var gameover = 0


function runSPLASH(deltaTime)
{
    splashTimer -= deltaTime;
    if(splashTimer <= 0)
    {
        gameState = STATE_GAME;
        return;
    }
    
    context.fillStyle = "#000";
    context.font="24px Arial";
    context.fillText("SPLASH SCREEN!!!!", 200, 240);
}

function runGame(deltaTime)
{
    
}

function runGameOver(deltaTime)
{
    
}


var Player = function() 
{
	image = document.createElement("img");
	image.src = "Player.png"

	x = 570;
	y = 340;

    width= 63;
    height= 57;

    directionX = 0;
    directionY = -0.25;

    angularDirection = 0;
    rotation = 0;

    health = 2;

    shootTimer = 0;
}

var grass = document.createElement("img");
grass.src = "grass.png";

var background = [];

for(var y=0;y<105;y++)
{
    background[y] = [];
    for(var x=0; x<70; x++)
           background[y][x] = grass;
}

var player = {
  image: document.createElement("img"),
  x: SCREEN_WIDTH/2,
  y: SCREEN_HEIGHT/2,
  width: 9,
  height: 8,
  directionX: 0,
  directionY: 0,
  angularDirection: 0,
  rotation: 0
};


player.image.src = "ship.png";


//bullet.image.src = "bullet.png";
var bullets = [];

function playerShoot()
{
    var bullet = {
        image: document.createElement("img"),
        x: player.x,
        y: player.y,
        width: 5,
        height: 5,
        velocityX: 0,
        velocityY: 0
    };
    bullet.image.src = "bullet.png";
 
    var velX = 0;
    var velY = -1;
    var s = Math.sin(player.rotation);
    var c = Math.cos(player.rotation);
    var xVel = (velX * c) - (velY * s);
    var yVel = (velX * s) + (velY * c);
 
    bullet.velocityX = xVel * BULLET_SPEED;
    bullet.velocityY = yVel * BULLET_SPEED;
 
    bullets.push(bullet);
}
/*
var asteroid = {
  image: document.createElement("img"),
  x: 100,
  y: 100,
  width: 69,
  height: 75,
  directionX: 0,
  directionY: 0,
  isDead: false
};

asteroid.image.src = "rock_large.png";

asteroid.directionX = 10;
asteroid.directionY = 8;


var magnitude = Math.sqrt( ( asteroid.directionX * asteroid.directionX)
                   + (asteroid.directionY * asteroid.directionY) );
if(magnitude != 0)
{
      asteroid.directionX /= magnitude;
      asteroid.directionY /= magnitude;
}*/

var asteroids = [];

      

window.addEventListener('keydown', function(evt) { onKeyDown(evt); }, false);
window.addEventListener('keyup', function(evt) { onKeyUp(evt); }, false);
 
 



var KEY_SPACE = 32;
var KEY_LEFT =37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var shootTimer = 0;
var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
var spawnTimer = 0;
var speed = 0;

 
var test = -0;

function getDeltaTime()
{
    endFrameMillis = startFrameMillis;
    startFrameMillis = Date.now();
    var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
    if (deltaTime > 1)
    {
        deltaTime = 1;
    }
    return deltaTime;
}  
           


function rand(floor, ceil)
{
    return Math.floor( (Math.random()* (ceil-floor)) +floor );
}

function spawnAsteroid()
{
    var type = rand(0, 300);
    
    var asteroid = {};
    
    asteroid.image = document.createElement("img");
    asteroid.image.src = "rock_large.png";
    asteroid.width = 6;
    asteroid.hight = 7;
    
    var x = SCREEN_WIDTH/2;
    var y = SCREEN_HEIGHT/2;
    
    
    var dirX = rand(-10,10);
    var dirY = rand(-10,10);
    
    var magnitude = (dirX * dirX) + (dirY * dirY);
    if(magnitude != 0)
    {
        var oneOverMag = 1 / Math.sqrt(magnitude);
        dirX *= oneOverMag;
        dirY *= oneOverMag;
    }
    
    var movX = dirX * SCREEN_WIDTH;
    var movY = dirY * SCREEN_HEIGHT;
    
    asteroid.x = x + movX;
    asteroid.y = y + movY;
    
    asteroid.velocityX = -dirX * ASTROID_SPEED;
    asteroid.velocityY = -dirY * ASTROID_SPEED;
    
    asteroids.push(asteroid);
}



function intersects(x1, y1, w1, h1, x2, y2, w2, h2)
{
     if(y2 + h2 < y1 ||
           x2 + w2 < x1 ||
           x2 > x1 + w1 ||
           y2 > y1 + h1)
     {
           return false;
     }
     return true;
}


 
 
//this code will be set up the framework so that the 'run' dunction is called 60 times/s. we have some option to fall back on in this case the browser doesn't support our preferred method.

 
 
 
function onKeyDown(event)
{
      if(event.keyCode == KEY_UP)
      {
           player.directionY = 10;
      }
 
      if(event.keyCode == KEY_DOWN)
      {
           player.directionY = -1.5;
      }      
      if(event.keyCode == KEY_LEFT)
      {
            player.angularDirection = -2;
      }
      if(event.keyCode == KEY_RIGHT)
      {
            player.angularDirection = 2;
      }
      if(event.keyCode == KEY_SPACE && shootTimer <=0)
      {
          shootTimer += 0.3;
          playerShoot();
          //console.log(cheek)
      }     
}

function onKeyUp(event)
{
      if(event.keyCode == KEY_UP)
      {
           player.directionY = 0;
      }
 
      if(event.keyCode == KEY_DOWN)
      {
           player.directionY = 0;
      }      
      if(event.keyCode == KEY_LEFT)
      {
            player.angularDirection = 0;
      }
      if(event.keyCode == KEY_RIGHT)
      {
            player.angularDirection = 0;
      }/*
      if(event.keyCode == KEY_SPACE)
      {
           // playerShoot();
      }*/}

function run() {
    context.fillStyle = "#111";
    context.fillRect(0, 0, canvas.width, canvas.height);




    var deltaTime = getDeltaTime();

    switch (gameState) {
        case STATE_SPLASH:
            runSPLASH(deltaTime)
            break;
        case STATE_GAME:
            runGame(deltaTime)
            break;
        case STATE_GAMEOVER:
            runGameOver(deltaTime)
            break;

    }

    for (var y = 0; y < 105; y++) {
        for (var x = 0; x < 70; x++) {
            context.drawImage(background[y][x], x * 32, y * 32);
        }
    }

    for (var i = 0; i < asteroids.length; i++) {
        if (intersects(
            asteroids[i].x, asteroids[i].y,
            asteroids[i].width, asteroids[i].height,
            player.x - player.width / 2, player.y - player.height / 2,
            player.width, player.height) == true) {
            gameover = true;
            break;
        }
    }
    if (this.shootTimer > 0) {
        this.shootTimer -= deltaTime;
    }
    /*
    if(bullet.isDead == false)
    {
          bullet.x += bullet.velocityX;
          bullet.y += bullet.velocityY;
          context.drawImage(bullet.image,
                bullet.x - bullet.width/2,
                bullet.y - bullet.height/2)
          
          
          if(asteroid.isDead == false)
          {
                var hit = intersects(
                             bullet.x, bullet.y,
                             bullet.width, bullet.height,
                             asteroid.x, asteroid.y,
                             asteroid.width, asteroid.height);
                if(hit == true)
                {
                       bullet.isDead = true;
                       asteroid.isDead = true;
                }
          }
          if(bullet.x < 0 || bullet.x > SCREEN_WIDTH || 
                  bullet.y < 0 || bullet.y > SCREEN_HIGHT)
          {
                  bullet.isDead = true;
          }*/



    if (shootTimer > 0)
        shootTimer -= deltaTime;

    for (var i = 0; i < bullets.length; i++) {
        bullets[i].x += bullets[i].velocityX;
        bullets[i].Y += bullets[i].velocityY;
    }

    for (var i = 0; i < bullets.length; i++) {

        if (bullets[i].x < -bullets[i].width ||
            bullets[i].x > SCREEN_WIDTH ||
            bullets[i].y < -bullets[i].height ||
            bullets[i].y > SCREEN_HEIGHT) {

            bullets.splice(i, 1);
            break;
        }
    }
    for (var i = 0; i < bullets.length; i++) {
        context.drawImage(bullets[i].image,
            bullets[i].x - bullets[i].width / 2,
            bullets[i].y - bullets[i].height / 2);
    }
    //var hit = 0;





    //if(player.x >= canvas.width || player.y >= canvas.height)
    if (player.x < 0 || player.x > SCREEN_WIDTH ||
        player.y < 0 || player.y > SCREEN_HEIGHT)//|| hit == true)
    {
        //console.log("hit")
        gameover = true
    }



    if (gameover == true) {
        context.fillStyle = "#000";
        context.font = "240px Arial";
        context.fillText("game over!", 400, 240);
    }


    //}

    var s = Math.sin(player.rotation);
    var c = Math.cos(player.rotation);

    var XDir = (player.directionX * c) - (player.directionY * s);
    var YDir = (player.directionX * s) + (player.directionY * c);
    var XVel = XDir * PLAYER_SPEED;
    var YVel = YDir * PLAYER_SPEED;


    player.x += XVel;
    player.y += YVel;

    player.rotation += player.angularDirection * PLAYER_TURN_SPEED;

    //context.drawImage(player, x, y);

    context.save();
    context.translate(player.x, player.y);
    context.rotate(player.rotation);
    context.drawImage(
        player.image, -player.width / 2, -player.height / 2);
    context.restore();
    /*
    var velocityX = asteroid.directionX * ASTROID_SPEED;
    var velocityY = asteroid.directionY * ASTROID_SPEED;
    asteroid.x += velocityX;
    asteroid.y += velocityY;
    context.drawImage(asteroid.image,
          asteroid.x - asteroid.width/2,
          asteroid.y - asteroid.height/2);
     
    for(var i=0; i<asteroids.length; i++)
    {
        var velX = asteroids[i].dirX * speed;
        var velY = asteroids[i].dirY * speed;
        asteroids[i].posX = asteroids[i].posX + velX;
        asteroids[i].posY = asteroids[i].posY + velY;
        
        if(asteroids[i].posX > canvas.width || asteroids[i].posX < 0)
        {
           asteroids[i].dirX = -asteroids[i].dirX;
        }
        if(asteroids[i].posY > canvas.height || asteroids[i].posY < 0)
        {
            asteroids[i].dirY = -asteroids[i].dirY;
        }
    }*/

    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].x = asteroids[i].x + asteroids[i].velocityX;
        asteroids[i].y = asteroids[i].y + asteroids[i].velocityY;

    }

    for (var i = 0; i < asteroids.length; i++) {
        context.drawImage(asteroids[i].image, asteroids[i].x, asteroids[i].y);
    }

    spawnTimer -= deltaTime;

    if (spawnTimer <= 0) {
        spawnTimer = 1;
        spawnAsteroid();
    }

    for (var i = 0; i < asteroids.length; i++) // Here we see if a bullet has collided with an asteroid and deletes both accordingly
    {
        for (var j = 0; j < bullets.length; j++) {
            if (intersects(
                bullets[j].x, bullets[j].y,
                bullets[j].width, bullets[j].height,
                asteroids[i].x, asteroids[i].y,
                asteroids[i].width, asteroids[i].height) == true) {
                asteroids.splice(i, 1);
                bullets.splice(j, 1);
                break;

            }
        }
    }




    /*
    for(var i=0; i<8; i++)
    {
        var asteroid = document.createElement("img");
        asteroid.src = "rock_large.png";
        asteroid.posX = i*80;
        asteroid.posY = i*20;
        asteroid.radius = 37.5;
        asteroid.dirX = 4;
        asteroid.dirY = 4;
        
        var dirLength = Math.sqrt(asteroid.dirX * asteroid.dirX + asteroid.dirY * asteroid.dirY);
        asteroid.dirX /= dirLength;
        asteroid.dirY /= dirLength;
        asteroids.push(asteroid);
    }
    
    for(var i=0; i<asteroids.length; i++)
    {
        context.drawImage(asteroids[i], asteroids[i].posX - asteroids[i].width/2, asteroids[i].posY - asteroids[i].height/2);
        context.beginPath();
        context.rect(asteroids[i].posX - (asteroids[i].width/2), asteroids[i].posY - (asteroids[i].height/2), asteroids[i].width, asteroids[i].height);
        context.stroke();
    }
      */
    context.fillStyle = "#000";
    context.font = "40px Arial";
    context.fillText(gameover + "         space to use invisible heat seeking bullets!!!!", 200, 240);
}

 (function() {
   var onEachFrame;
   if (window.requestAnimationFrame) {
     onEachFrame = function(cb) {
       var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
       _cb();
      };
   } else if (window.mozrequestAnimationFrame) {
     onEachFrame = function(cb) {
       var _cb = function() { cb();
window.mozRequestAnimationFrame(_cb); }
       _cb();
     };
   } else {
     onEachFrame = function(cb) {
       setInterval(cb, 1000 / 60);
     }
   }
 
   window.onEachFrame = onEachFrame;
})();
 
window.onEachFrame(run);