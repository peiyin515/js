class gameOver extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'gameOver' });
  }

  preload() {
      this.load.image('gameover','assets/gameover.jpg');
      this.load.audio("gameoversound", "assets/gameover.mp3");
  
  }

  create () {
    console.log("game over");

    this.gameoverSnd = this.sound.add("gameoversound").setVolume(0.4);

      this.add.image(0, 0, 'gameover').setOrigin(0, 0);

      window.cockroach =8;
      window.heart = 3;

      var spaceDown = this.input.keyboard.addKey('SPACE');

      spaceDown.on('down', function(){
      console.log("Try Again");
      this.scene.start("lobby");
      }, this );

      this.gameoverSnd.play();

  }
  

}
