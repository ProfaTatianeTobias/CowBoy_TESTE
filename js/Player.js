class Player {
    constructor() {
      this.name = null;
      this.index = null;
      this.positionX = 0; //bala
      this.positionY = 0; //bala
      this.time = 0;
      this.winner = 0;
    }
  
    addPlayer() {
      var playerIndex = "players/player" + this.index;
  
      if (this.index === 1) {
        this.positionX = width/4+43;
        this.positionY = height-80;
      } else {
        this.positionX = width-285;
        this.positionY = height-55;
      }
  
      database.ref(playerIndex).set({
        name: this.name,
        positionX : this.positionX,
        positionY : this.positionY,
        time: this.time,
      });
    }
  
    getCount() {
      var playerCountRef = database.ref("playerCount");
      playerCountRef.on("value", data => {
        playerCount = data.val();
      });
    }
  
    updateCount(count) {
      database.ref("/").update({
        playerCount: count,
      });
    }
  

    update() {
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).update({
        positionX : this.positionX,
        positionY : this.positionY,
        time: this.time,
      });
    }
  
    static getPlayersInfo() {
      var playerInfoRef = database.ref("players");
      playerInfoRef.on("value", data => {
        allPlayers = data.val();
      });
    }

    getShoot(){
      var balaTiroRef = database.ref("players/player" + this.index);
      balaTiroRef.on("value", data => {
        var data = data.val();
        this.positionX = data.positionX;
        this.positionY = data.positionY;
      });
    }

  }//class
  