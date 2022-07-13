class Form {
    constructor() {
      this.input = createInput("").attribute("placeholder", "Digite Seu Nome");
      this.playButton = createButton("Jogar");
      this.title = createElement("h2","Cowboy Game");
      this.greeting = createElement("h2");
    }
  
    setElementsPosition() {
      this.title.position(width/4, height/10);
      this.input.position(width/2 - 110, height/2 - 80);
      this.playButton.position(width/2 - 90, height/2 - 20);
      this.greeting.position(width/2 - 300, height/2 - 100);
    }
  
    setElementsStyle() {
      this.title.class("gameTitle");
      this.input.class("customInput");
      this.playButton.class("customButton");
      this.greeting.class("greeting");
    }
  
    hide() {
      this.greeting.hide();
      this.playButton.hide();
      this.input.hide();
    }
  
    formMousePressed() {
      this.playButton.mousePressed(() => {
        this.input.hide();
        this.playButton.hide();
        var message = `
        Olá ${this.input.value()},
        </br>espere o outro jogador entrar...`;
        this.greeting.html(message);
        playerCount += 1;
        player.name = this.input.value();
        player.index = playerCount;
        player.addPlayer();
        player.updateCount(playerCount);
        player.getShoot();
      });
    }
  
    display() {
      this.setElementsPosition();
      this.setElementsStyle();
      this.formMousePressed();
    }
  }
  