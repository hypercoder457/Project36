var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;

// create feed and lastFed variable here
var feed, lastFed;
var fedTime;

function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", readFedTime);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  // create feed the dog button here
  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  // write code to display text lastFed time here
  push();
  if(lastFed >= 12) {
    fill("white");
    if(lastFed === 12) {
      text(`Last Fed Time: 12 PM`, 350, 50);
    } else if(lastFed === 13) {
      text(`Last Fed Time: 1 PM`, 350, 50);
    } else {
      var timeToString = lastFed.toString();
      var actualHour = timeToString[1];
      var numberHour = Number(actualHour);
      numberHour -= 2;
      text(`Last Fed Time: ${numberHour} PM`, 350, 50);
    }
  } else if(lastFed === 0) {
    fill("white");
    text(`Last Fed Time: 12 AM`, 350, 50);
  } else {
    fill("white");
    text(`Last Fed Time: ${lastFed} AM`, 350, 50);
  }
  pop();
  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function readFedTime(data) {
  lastFed = data.val();
}


function feedDog() {
  dog.addImage(happyDog);

  // write code here to update food stock and last fed time
  foodS--;
  database.ref('/').update({
    Food: foodS,
    FeedTime: hour()
  })
}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
