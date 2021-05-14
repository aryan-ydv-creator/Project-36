//Create variables here
var database;
var dog, happyDog,dogimg;
var foodS, foodStock;
var bg;
var lastFed, feedTime;
var addFood , Feed;
var foodObj;

function preload()
{
	//load images here
  dogimg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
  bg = loadImage("images/bg.png")
  
}

function setup() {
  database = firebase.database();
	createCanvas(1000,400);
  foodObj = new Food();

  foodStock = database.ref('Food')
  foodStock.on('value',readStock)

  dog = createSprite(500,200-50,180,30,30)
  dog.addImage(dogimg)
  dog.scale = 0.24

  Feed = createButton("Feed");
  Feed.position(700,15);
  Feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(750,15);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(bg)
  
  foodObj.display();

  feedTime = database.ref('FeedTime')
  feedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("Last Feed: "+lastFed%12+ " PM",350,30)
    
  }
  else if(lastFed ===0){
    text("Last Feed: 12AM",350,30)
  }
  else{
    text("Last Feed: "+lastFed+ " AM",350,30)
  }
  
  drawSprites();

  }
  

// Other function 

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodsStock(foodS)
}

function feedDog(){
dog.addImage(happyDog);
foodObj.updateFoodsStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food: foodObj.getFoodStock(),
  feedTime : hour()
})

}

function addFoods(x){
 foodS++;
  database.ref("/").update({
    'Food':foodS
  })

}


