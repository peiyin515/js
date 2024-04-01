//gameScene.js

class level2ruleScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level2ruleScene' });
    }


    preload(){
    // simple Main Page image
    this.load.image('level2rule', 'assets/level2rule.jpg');
    
    }

    create() {
      
        this.add.image(0, 0, 'level2rule').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto level2");
            this.scene.start("level2");
            }, this );

        //this.input.once('pointerdown', function(){
        var key1 = this.input.keyboard.addKey(49);
        var key2 = this.input.keyboard.addKey(50);
        var key3 = this.input.keyboard.addKey(51);
        var key4 = this.input.keyboard.addKey(52);
        

        key1.on('down', function(){
            this.scene.stop("level2ruleScene");
            this.scene.start("lobby");
            }, this );

        key2.on('down', function(){
            this.scene.stop("level2ruleScene");
            this.scene.start("level1");
            }, this );

        key3.on('down', function(){
            this.scene.stop("level2ruleScene");
            this.scene.start("level2");
            }, this ); 

            key4.on('down', function(){
                this.scene.stop("level2ruleScene");
                this.scene.start("level3");
                }, this ); 
    }

    update(){



    }
}
