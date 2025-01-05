window.onload = () => {
  const canvas = document.getElementById("mainCanvas");
  const context = canvas.getContext("2d");

  const canvasHeight = canvas.height;
  const canvasWidth = canvas.width;
  let rectArray = [];

  let barX = 0;

  function updatePosition(e) {
    Bar.x = e.offsetX - 100;
  }

  canvas.addEventListener("mousemove", updatePosition);

  class Rectangle {
    constructor(id, x, y, width, height, rectColor) {
        this.id = id;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.rectColor = rectColor;
    }
  }

  const Bar = {
    x: barX - 100,
    y: canvasHeight - 50,
    width: 200,
    height: 20,
  };

  const Ball = {
    x: 600,
    y: 600,
    radius: 15,
    accX: 0,
    accY: 3,
  };

  generateRectangles();

  function drawRectangles() {
    for (r of rectArray) {
        context.fillStyle = r.rectColor;
        context.fillRect(r.x, r.y, r.width, r.height);
    }
  }

  function generateRectangles() {
    const colours = ["red", "orange", "yellow", "green", "blue"];
    let startingY = 50;
    let spaceBetweenRect = 8;
    let rectWidth = 100;
    let rectHeight = 50;
    let rectId = 0;
    for (i = 0; i < 5; i++) {
      let startingX = 8;

      for (j = 0; j < 11; j++) {
        rectId++;
        let rectangle = new Rectangle(
          rectId,
          startingX,
          startingY,
          rectWidth,
          rectHeight,
          colours[i]
        );
        rectArray.push(rectangle);
        startingX += rectWidth + spaceBetweenRect;
      }
      startingY += rectHeight + spaceBetweenRect;
    }
  }

  function drawBall() {
    context.fillStyle = "black";
    context.beginPath();
    context.arc(Ball.x, Ball.y, Ball.radius, 0, 2 * Math.PI);
    context.fill();
  }

  function detectBarCollision() {
    if (
      Ball.x + Ball.radius >= Bar.x &&
      Ball.x + Ball.radius <= Bar.x + Bar.width
    ) {
      if (Ball.y + Ball.radius - 3 == Bar.y) {
        Ball.accX = (-1 * (Bar.x + 100 - Ball.x + 15)) / 10;
        Ball.accY = Ball.accY * -1;
      }
    }
  }

  function detectRectCollision() {
    for (r of rectArray) {
      if ((Ball.y + Ball.radius >= r.y - 3) && (Ball.y - Ball.radius <= r.y + r.height + 3)) {
        if ((Ball.x + Ball.radius >= r.x - 3) && (Ball.x - Ball.radius <= r.x + r.width + 3))
        {
            rectArray = rectArray.filter(rect => rect.id !== r.id)
            Ball.accY = Ball.accY * -1;
        }
       
      }
    }
  }

  function marginDetection() {
    if (Ball.x > -10 && Ball.x < 3) {
      Ball.accX = Ball.accX * -1;
    }

    if (Ball.x + Ball.radius > canvasWidth - 10 && Ball.x + Ball.radius < canvasWidth + 3) {
      Ball.accX = Ball.accX * -1;
    }

    if(Ball.y > -10 && Ball.y < 3)
    {
        Ball.accY = Ball.accY * -1;
    }

    if(Ball.y > canvasHeight - 10 && Ball.y < canvasHeight + 3)
        {
            Ball.accY = Ball.accY * -1;
        }
  }

  function displayEndGameScreen(message) {
    context.clearRect(0, 0, canvasWidth, canvasHeight); 
    context.fillStyle = "black"; 
    context.font = "48px Arial"; 
    context.textAlign = "center"; 
    context.fillText(message, canvasWidth / 2, canvasHeight / 2); 
  }

  const timer = setInterval(function updateGame() {
    context.clearRect(0, 0, 1200, 800);
    drawRectangles();
    drawBall();
    Ball.x += Ball.accX;
    Ball.y += Ball.accY;
    context.fillRect(Bar.x, Bar.y, Bar.width, Bar.height);
    detectBarCollision();
    detectRectCollision();
    marginDetection();
    if(rectArray.length === 0 ){
        clearInterval(timer);
        context.clearRect(0, 0, canvasWidth, canvasHeight); 
        displayEndGameScreen("You Win")
    } 
  }, 1);


};
