var streams = [];
//symbolSize c'est une variable global pour la taiile du caractère
var symbolSize = 60;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  //
  var x = 0;
  var y = random(-150,-180);
  //each stream is the symbols wide donc on devise la largeur du canvas sur la taille du symbole qui est: sybolSize
  for (let i = 0; i < width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, y);
    streams.push(stream);
    //Pour que les stream ne s'affiche pas dans une seul colonne alors on incremente de la taille du symbolSize
    // x += symbolSize*2.5;
    x += symbolSize*1.1;
  }
  
  //textSize c'est une fonction P5.js pour la taille
  textSize(symbolSize);
}
//60 frames per second
function draw() {
  //redraw the background every frame in draw function
  background(0);
  streams.forEach(function(stream){
    stream.render();
  });

}

/**class Symbol c'est pour tous les symboles qui défile */
//x , y c'est pour ça localisation dans l'écran, speed c'est la valeur du déplacement du symbole
function Symbol(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  //this.value c'est pour la valeur du symbole qui ne sera pas initialiser car il est générer aléatoirement
  this.value;
  //Construire un intervale pour les frames, this.switchInterval c'est pour définir les frames
  this.switchInterval = round(random(2, 20)) ;

  // setToRandomSymbol c'est une fonction pour donner la vleur du symbole

  this.setToRandomSymbol = function () {
    //Les caractère sont du catacana
    // frameCount is a variable that is built into P5.js
    if(frameCount % this.switchInterval === 0){

        // this.value = String.fromCharCode(0xfdf2) ;// + round(random(1))
        this.value = String.fromCharCode(
            0xfdf2//0x30A0 + floor(random(0, 97))
          );
    }
  };

  //render c'est une fonction qui permet l'affichage du symbole
  this.render = function () {
   
  };

  //rain c'est la fonction du dplacement du symbol
  this.rain = function () {
    //if the y value is >= of height of the canvas switch theme in the top of canvas
    // if (this.y >= height) {
    //   this.y = 0;
    // } else {
    //   this.y += this.speed;
    // }
    //et vue que c'est la valeur y qui est le deplacement vertical du symbole alors il faut l'instruire avec 
    //la syntaxe qui suit car elle doit avoir une valeur

    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  };
}











/**class Stream c'est pour l'ensemble des symboles qui défile */
function Stream() {
    //La les symboles sont dont un tableau
    this.symbols = [];
    //How many symbols it has this stream
    this.totalSymbols = round(random(5, 13));
    //for every stream how fast is traveling at
    this.speed = random(2, 6);

    this.generateSymbols = function(x, y){
        //  this.y = y;
        //  this.x = x;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
        }
    };

    this.render = function(){
        this.symbols.forEach(function(symbol){
             //text c'esr une fonction p5.JS
        fill(0, 255, 70);
        text(symbol.value, symbol.x, symbol.y);
        //On appel la fonction rain() pour le dplacemet du symbole dans l'affichage
        symbol.rain();
        symbol.setToRandomSymbol();
        });
    };

}
