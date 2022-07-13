class Game {
    constructor() {
      this.entrada_cowboy = createInput("");
      this.entrada_inimigo = createInput("");
      this.botao_cowboy = createButton("");
      this.botao_inimigo = createButton("");
      this.reset = createButton("Reset");
      this.sequencia = createElement("h2");
      this.mensagemFinal = createElement("h2");
      //this.balaMovendo = false;
    }
  
    gameMousePressed() {
      this.botao_cowboy.mousePressed(() => {
      this.numeraçao();   
      });
      this.botao_inimigo.mousePressed(() => {
        this.numeraçaoInimigo();
      });
    }
  
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function(data) {
        gameState = data.val();
      });
    }

    update(state) {
      database.ref("/").update({
        gameState: state
      });
    }
  
    start() {
      player = new Player();
      playerCount = player.getCount();
  
      form = new Form();
      form.display();

      cowboy = createSprite(width/4,height-90,10,30);
      cowboy.addImage(cowboyImg);

      indio = createSprite(width/2-30,height-150,10,10);
      indio.addImage("indio", indioImg);
      indio.addImage("indioB", indioBImg);
      indio.addImage("indioC", indioCImg);
      indio.changeImage("indio");

      edges=createEdgeSprites();

      bandido=createSprite(width-250,height-80,10,20);
      bandido.addImage(bandidoImg);
      bandido.scale = 1.3;

      arma=createSprite(width/4+45,height-80,10,30);
      arma.addImage(armaImg);

      bala=createSprite(width/4+43,height-80,10,30);
      bala.addImage(balaImg);
      bala.scale=0.01;
      bala.visible=false;

      armaInimigo=createSprite(width-280,height-55,10,30);
      armaInimigo.addImage(armaInimigoImg);
      
      balaInimigo=createSprite(width-285,height-55,10,30);
      balaInimigo.addImage(balaInimigoImg);
      balaInimigo.scale=0.01;
      balaInimigo.visible=false;

      jogadores = [bala,balaInimigo];
      //players     0       1
        
    }//start
  
    elementosTela() {
      form.hide();
      form.title.position(40, 50);
      form.title.class("gameTitleAfterEffect");

      this.entrada_cowboy.class("numberInput");
      this.entrada_cowboy.position(width/3-30, height-90);
      
      this.entrada_inimigo.class("numberInput");
      this.entrada_inimigo.position(width-400, height-90);

      this.botao_cowboy.class("playButton");
      this.botao_cowboy.position(width/3-30, height-150);
      
      this.botao_inimigo.class("playButton");
      this.botao_inimigo.position(width-400, height-150);

      this.reset.class("resetButton");
      this.reset.position(width-200, 50);

      this.sequencia.class("greeting");
      this.sequencia.position(width/2, height/2);

      this.mensagemFinal.class("greeting");
      this.mensagemFinal.position(width/2 - 300, height/2 - 100);

    }//elementosTela
  
    play() 
    {
      this.elementosTela();
      this.resetButton();
  
      Player.getPlayersInfo();

      
    if (allPlayers !== undefined) 
    {
        //alterar a imagem
        console.log("players definidos");
        image(fundoIMG, 0, 0, width, height);

        this.gameMousePressed();

        //this.showLeaderboard();
    
         //índice da matriz
        var index = 0;
        for (var plr in allPlayers) {
          //adicione 1 ao índice para cada loop
          index = index + 1;

          //exibição dos personagens
          var x = allPlayers[plr].positionX;
          var y = allPlayers[plr].positionY;

          jogadores[index-1].position.x = x;
          jogadores[index-1].position.y = y;

          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 50, 50);
          }
        }//for in

        if(acerto === false)
        {
          this.numeros();
        }
    
          this.confere(codigoCowboy,bala);
    
          this.confere(codigoInimigo,balaInimigo);

          //if(gameState === 2){
            //this.balaMovendo = true;
            this.tiro();
         // }
          
        drawSprites();
      }//if allPlayers
    }//play

    tiro(){
      var players = Object.values(allPlayers);
      if(players[0].time < players[1].time){
        player.positionX += 18;
        console.log("cowboy atirou");
        player.update();
        this.mensagemFinal.html(`${players[0].name} venceu!`);
        //indio.changeImage("indioB");
        //this.showLeaderboard();
        //setTimeout(() => {
        //  this.end();
       // }, 10000);
      }
      if(players[1].time < players[0].time){
        player.positionX -= 18;
        console.log("inimigo atirou");
        player.update();
        this.mensagemFinal.html(`${players[1].name} venceu!`);
        //indio.changeImage("indioC");
        // this.showLeaderboard();
       // setTimeout(() => {
       //   this.end();
       // }, 10000);
      }
    }

    resetButton() {
      this.reset.mousePressed(() => {
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
          players: {},
        });
        window.location.reload();
      });
    }//resetButton

    end() {
      gameState === 3;
      console.log("Fim de Jogo");
    }//end

    numeros(){
        if (frameCount%100===0&&contador<3){
          sequencia=Math.round(random(1,90));
          codigo[contador]=sequencia;
          noLoop();
          //textSize(60);
          //fill("black")
          //text(sequencia,width/2,height/2);
          this.sequencia.html(sequencia);
          contador+=1;
          console.log(sequencia);
          setTimeout(()=>{
          loop();
          },1000);
        }
      }//numeros
      
    numeraçao(){
        console.log("numeracao começa");
        codigoCowboy[icowboy]=Number(this.entrada_cowboy.value());
        this.entrada_cowboy.value("");
        icowboy+=1;
        console.log("numeracao termina");
      }//numeracao

    numeraçaoInimigo(){
        codigoInimigo[iinimigo]=Number(this.entrada_inimigo.value());
        this.entrada_inimigo.value("");
        iinimigo+=1;
      }//numeracaoInimigo
      
    confere(personagem,tiro){
      if(personagem.length===3 && codigo.length===3)
       {
         if(JSON.stringify(codigo)===JSON.stringify(personagem))
        { 
          acerto = true;
          tiro.visible=true;
          if(tiro===bala){
            player.time = millis();
            tempoCowboy = player.time;
            console.log("tempo Cowboy: "+tempoCowboy);
            player.update();
            //gameState = 2;
          }
          if(tiro===balaInimigo){
            player.time = millis();
            tempoInimigo = player.time;
            console.log("tempo Inimigo: "+tempoInimigo);
            player.update();
            //gameState = 2;
          }
          console.log("conferência de string");
        }
      } 
      }//confere
      
      showLeaderboard() {
        var leader1 = "Vencedor: ?";
        var players = Object.values(allPlayers);
        if(players[0].time < players[1].time)
        {
          leader1 = `Vencedor: ${players[0].name}`;
        }
        if(players[0].time > players[1].time)
        {
          leader1 = `Vencedor: ${players[1].name}`;
        }

        this.mensagemFinal.html(leader1);
      
      }
    
      
  }//class
  