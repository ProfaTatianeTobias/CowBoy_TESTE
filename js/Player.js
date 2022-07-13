class Player {
    constructor() {
      this.name = null;
      this.index = null;
      this.balaX = 0;
      this.balaY = 0;
      this.time = 0;
      this.winner = 0;
    }
  
    addPlayer() {
      var playerIndex = "players/player" + this.index;
  
      if (this.index === 1) {
        this.balaX = width/4+43;
        this.balaY = height-80;
      } else {
        this.balaX = width-335;
        this.balaY = height-55;
      }
  
      database.ref(playerIndex).set({
        name: this.name,
        balaX : this.balaX,
        balaY : this.balaY,
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
        balaX : this.balaX,
        balaY : this.balaY,
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
        this.balaX = data.balaX;
        this.balaY = data.balaY;
      });
    }

  }//class
  