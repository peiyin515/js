class lobby extends Phaser.Scene {
  constructor() {
    super({ key: "lobby" });
  }

  // Put global variable here

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("lobby", "assets/lobby.tmj");

    // Step 2 : Preload any images here

    this.load.image("genericIMG", "assets/1_Generic_32x32.png");
    this.load.image("basementIMG", "assets/14_Basement_32x32.png");
    this.load.image("systemIMG","assets/17_Visibile_Upstairs_System_32x32.png");
    this.load.image("jailIMG", "assets/18_Jail_32x32.png");
    this.load.image("buildingIMG", "assets/Buildings32x32.png");
    this.load.image("carpetIMG", "assets/Carpet.png");
    this.load.image("defimonIMG", "assets/defimon3.png");
    this.load.image("gameintro", "assets/gameintro.jpg");
    
    this.load.spritesheet("gen", "assets/cat.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("life", "assets/heart.png");
    this.load.spritesheet('heart', 'assets/life.png',{ frameWidth:64, frameHeight:64 });

    this.load.audio("collect", "assets/collect.mp3");
    

  }

  create() {


    console.log("life:", window.heart);

    console.log("lobby");

    this.collectSnd = this.sound.add("collect");

    this.anims.create({
      key:'heartAnim',
      frames:this.anims.generateFrameNumbers('heart',
      { start:0, end:1 }),
      frameRate:5,
      repeat:-1
  });

    this.anims.create({
      key: "gen-up",
      frames: this.anims.generateFrameNumbers("gen", { start: 9, end: 11 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-left",
      frames: this.anims.generateFrameNumbers("gen", { start: 3, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-down",
      frames: this.anims.generateFrameNumbers("gen", { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-right",
      frames: this.anims.generateFrameNumbers("gen", { start: 6, end: 8 }),
      frameRate: 5,
      repeat: -1,
    });

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "lobby" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let genericTiles = map.addTilesetImage("1_Generic_32x32", "genericIMG");
    let basementTiles = map.addTilesetImage("14_Basement_32x32", "basementIMG");
    let systemTiles = map.addTilesetImage(
      "17_Visibile_Upstairs_System_32x32",
      "systemIMG"
    );
    let jailTiles = map.addTilesetImage("18_Jail_32x32", "jailIMG");
    let buildingTiles = map.addTilesetImage("Buildings32x32", "buildingIMG");
    let carpetTiles = map.addTilesetImage("Carpet", "carpetIMG");
    let defimonTiles = map.addTilesetImage("defimon3", "defimonIMG");

    // Step 5  create an array of tiles
    let tilesArray = [
      genericTiles,
      basementTiles,
      systemTiles,
      jailTiles,
      buildingTiles,
      carpetTiles,
      defimonTiles,
    ];

    // Step 6  Load in layers by layers

    this.ground = map.createLayer("ground", tilesArray, 0, 0);
    this.wall = map.createLayer("wall", tilesArray, 0, 0);
    this.wall2 = map.createLayer("wall2", tilesArray, 0, 0);
    this.furniture = map.createLayer("furniture", tilesArray, 0, 0);
    this.furniture2 = map.createLayer("furniture2", tilesArray, 0, 0);
    this.door = map.createLayer("door", tilesArray, 0, 0);
    this.stair = map.createLayer("stair", tilesArray, 0, 0);
    this.stair2 = map.createLayer("stair2", tilesArray, 0, 0);


    var key2Down = this.input.keyboard.addKey(50);

    key2Down.on(
      "down",
      function () {
        console.log("Key 2 pressed");
        this.scene.start("level1");
      },
      this
    );

    // let start = map.findObject("objectLayer", (obj) => obj.name === "start");
    // this.player = this.physics.add
    //   .sprite(start.x, start.y, "gen")
    //   .setScale(1.7);
    // this.player.body
    //   .setSize(this.player.width * 0.3, this.player.height * 0.3)
    //   .setOffset(12, 22);
    // window.player = this.player;

    this.player = this.physics.add.sprite(446, 144, 'gen').setScale(1.4)
    window.player = this.player
    this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.3)
    .setOffset(12,22)

    this.physics.world.bounds.width = this.ground.width;
    this.physics.world.bounds.height = this.ground.height;

  //hearts
  this.life1 = this.add
  .image(50, 40, "life")

  .setScrollFactor(0)
  .setVisible(false);
this.life2 = this.add
  .image(100, 40, "life")

  .setScrollFactor(0)
  .setVisible(false);
this.life3 = this.add
  .image(150, 40, "life")

  .setScrollFactor(0)
  .setVisible(false);

if (window.heart >= 3) {
  this.life1.setVisible(true);
  this.life2.setVisible(true);
  this.life3.setVisible(true);
} else if (window.heart == 2) {
  this.life1.setVisible(true);
  this.life2.setVisible(true);
} else if (window.heart == 1) {
  this.life1.setVisible(true);
}

this.physics.add.overlap(
  this.player,
  this.electric,
  this.minusLife,
  null,
  this
);
this.physics.add.overlap(
  this.player,
  this.electric2,
  this.minusLife,
  null,
  this
);
this.physics.add.overlap(
  this.player,
  this.electric3,
  this.minusLife,
  null,
  this
);
this.physics.add.overlap(
  this.player,
  this.cockroach,
  this.minusLife,
  null,
  this
);
this.physics.add.overlap(
  this.player,
  this.cockroach2,
  this.minusLife,
  null,
  this
);
this.physics.add.overlap(
  this.player,
  this.cockroach3,
  this.minusLife,
  null,
  this
);
this.physics.add.overlap(
  this.player,
  this.cockroach4,
  this.minusLife,
  null,
  this
);


    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);

    // this.wall.setCollisionByExclusion(-1, true);
    //this.physics.add.collider(this.player, this.wall)

    this.wall2.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.wall2);

    this.furniture.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.furniture);

    this.furniture2.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.furniture2);

    this.door.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.door);

    this.stair2.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.stair2);

    this.player.setCollideWorldBounds(true); // don't go out of the this.map



  } // end of create //

  update() {

    


    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("gen-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("gen-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("gen-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("gen-down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();
    }

     if (
        this.player.y > 466 &&
        this.player.y < 522 &&
        this.player.x < 6 
  
       ) {
        console.log("level1");
        this.level1();
       
  }
      
//   if (
//     this.player.x > 421 &&
//     this.player.x < 472 &&
//     this.player.y > 938 

//    ) {
//      console.log("level2");
//      this.level2();
// }


// if (
//   this.player.y > 471 &&
//   this.player.y < 522 &&
//   this.player.x > 952 

//  ) {
//    console.log("level3");
//    this.level3();
   
   
// }





      
   } // end of update //
  

  

  // Function to jump to room1
   level1(player, tile) {
     console.log("level1rule");
     this.scene.start("level1ruleScene",);
  }

//   level2(player, tile) {
//     console.log("level2 function");
//     this.scene.start("level2",);
//  }

//  level3(player, tile) {
//   console.log("level3 function");
//   this.scene.start("level3",);
// }

}
