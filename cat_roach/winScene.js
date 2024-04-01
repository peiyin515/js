class winScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'winScene' });
    }
  
    preload() {
        this.load.image('winScene','assets/winScene.jpg');
        this.load.audio("win", "assets/victory.mp3");
    }
  
    create () {
  
        
  
        this.winGameSnd = this.sound.add("win");
  
        this.add.image(0, 0, 'winScene').setOrigin(0, 0)
        console.log("This is winScene");
  
        window.cockroach = 8;
        window.heart = 3;
  
        var spaceDown = this.input.keyboard.addKey('SPACE');
  
        spaceDown.on('down', function(){
        console.log("win");
        this.scene.start("preload");
        }, this );
  
        this.winGameSnd.play();
  
    }
  
  }