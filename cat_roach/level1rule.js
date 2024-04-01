//gameScene.js

class level1ruleScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level1ruleScene' });
    }


    preload(){
    // simple Main Page image
    this.load.image('level1rule', 'assets/level1rule.jpg');
    
    }

    create() {
      
        this.add.image(0, 0, 'level1rule').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto level1");
            this.scene.start("level1");
            }, this );

        //this.input.once('pointerdown', function(){
        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);
        var key4 = this.input.keyboard.addKey(52);
        

        key1.on('down', function(){
            this.scene.stop("level1ruleScene");
            this.scene.start("lobby");
            }, this );

        key2.on('down', function(){
            this.scene.stop("level1ruleScene");
            this.scene.start("level1");
            }, this );

        key3.on('down', function(){
            this.scene.stop("level1ruleScene");
            this.scene.start("level2");
            }, this ); 

            key4.on('down', function(){
                this.scene.stop("level1ruleScene");
                this.scene.start("level3");
                }, this ); 
    }

    update(){



    }
}
