class Food{
   constructor(){

       this.foodS = foodS;
       this.image = loadImage('Milk.png');
     }
     getFoodStock(){
        var foodRef = database.ref('Food');
        foodRef.on("value", function(data){
            Food = data.val();
        })
     }
     updateFoodStock(){
        database.ref('/').update({
            Food: count
        });
     }

     deductFood(){

     }



   display(){
    var x=80,y=150;

    imageMode(CENTER);
    for(var i=0;i<=foodS;i++){
        if(i%10==0){
            x=50;
            y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;

    }

   }
       

}