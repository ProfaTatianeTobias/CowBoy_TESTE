var cowboy,edges,indio,bandido;
var cowboyImg,indioImg,bandidoImg, indioBImg, indioCImg;
var botao,botaoinimigo;
var codigo=[];
var sequencia;
var fundoIMG;
var nuvem,imgceu;
var contador=0
var entrada_cowboy;
var entrada_inimigo;
var arma;
var armaImg;
var bala;
var balaImg;
var codigoCowboy=[];
var codigoInimigo=[];
var icowboy=0;
var iinimigo=0;
var armaInimigo;
var armaInimigoImg;
var balaInimigo;
var balaInimigoImg;
var database;
var game, form, player, playerCount, gameState;
var allPlayers, jogadores;
var acerto=false;
var tempoCowboy = 0;
var tempoInimigo = 0;

// carrega as animaçoes 
function preload()
{
  fundoIMG=loadImage("assets/th.jpg");
  cowboyImg=loadImage("assets/teste.png");
  indioImg=loadImage("assets/teste3.png");
  bandidoImg=loadImage("assets/teste2.png");
  armaImg=loadImage("assets/arma.png");
  balaImg=loadImage("assets/bala3.png");
  armaInimigoImg=loadImage("assets/arma2.png");
  balaInimigoImg=loadImage("assets/bala32.png");
  indioCImg=loadImage("assets/indio_cowboy.png");
  indioBImg=loadImage("assets/indio_inimigo.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  database = firebase.database();
  //console.log(database);

  game = new Game();
  game.getState();
  game.start();

}

function draw(){
  //definir a cor do plano de fundo 
  background(fundoIMG); 

  if(playerCount ===2){
    game.update(1);
  }

  if(gameState === 1){
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



