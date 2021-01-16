//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImage, happyDogImage, dogImage2, dogImage3;
var feedButton, addFoodButton;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImage = loadImage('Dog.png');
  happyDogImage = loadImage('happyDog.png');
  dogImage2 = loadImage('images/dogImg.png');
  dogImage3 = loadImage('images/dogImg1.png');
  
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodObj = new Food();
  feedButton = createButton('Feed');
  feedButton.position(100,100);
  feedButton.mousePressed(feedDog);
  addFoodButton = createButton('Add Food');
  addFoodButton.position(200,100);
  addFoodButton.mousePressed(addFoods);

  
}


function draw() {  
  background(46,139,87);
  dog = createSprite(250,250);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  foodObj.display();

  fedTime = database.ref('lastFed');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  stroke(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: " +lastFed%12 + "PM", 300,30);
  }else if(lastFed==0){
    text("Last Feed: 12 AM", 300,30);
  }else{
    text("Last Feed: " + lastFed,300,30);
  }

  

  drawSprites();
  //add styles here
  textSize(20);
  stroke("purple");
  text("Note: Press up arrow key to feed drago milk", 50,100);
  textSize(20);
  stroke("purple");
  text("Food remaining: " + foodS, 50,150);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food: x
  });
  
}

function feedDog(){
  dog.addImage(happyDogImage);
  foodS = foodS-1;
  database.ref('/').update({
    Food: foodS
  })
  
  
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}



