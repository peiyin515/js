//gameScene.js

class mainScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'mainScene' });
    }


    preload(){
    // simple Main Page image
    this.load.image('mainpage', 'assets/gameintro.jpg');
    this.load.audio("bgm", "assets/song.mp3");

    }

    create() {
        this.music = this.sound.add("bgm",{loop: true}).setVolume(0.4);
    this.music.play();
        this.add.image(0, 0, 'mainpage').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto storyline");
            this.scene.start("storylineScene");
            }, this );

        //this.input.once('pointerdown', function(){
        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);
        var key4 = this.input.keyboard.addKey(52);
        

        key1.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("lobby");
            }, this );

        key2.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level1");
            }, this );

        key3.on('down', function(){
            this.scene.stop("mainScene");
            this.scene.start("level2");
            }, this ); 

            key4.on('down', function(){
                this.scene.stop("mainScene");
                this.scene.start("level3");
                }, this ); 
    }

    update(){



    }
}
