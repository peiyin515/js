//gameScene.js

class missionScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'missionScene' });
    }


    preload(){
    // simple Main Page image
    this.load.image('mission', 'assets/mission.jpg');

    }

    create() {
       
        this.add.image(0, 0, 'mission').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto lobby");
            this.scene.start("level1missionScene");
            }, this );

        //this.input.once('pointerdown', function(){
       
        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);
        var key4 = this.input.keyboard.addKey(52);
        

        key1.on('down', function(){
            this.scene.stop("missionScene");
            this.scene.start("level1missionScene");
            }, this );

        key2.on('down', function(){
            this.scene.stop("missionScene");
            this.scene.start("level1");
            }, this );

        key3.on('down', function(){
            this.scene.stop("missionScene");
            this.scene.start("level2");
            }, this ); 

            key4.on('down', function(){
                this.scene.stop("missionScene");
                this.scene.start("level3");
                }, this ); 
    }

    update(){



    }
}
