class level2 extends Phaser.Scene {
  constructor() {
    super({ key: "level2" });
  }

  // Put global variable here

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("level2", "assets/level2.tmj");

    // Step 2 : Preload any images here

    this.load.image("genericIMG", "assets/1_Generic_32x32.png");
    this.load.image("basementIMG", "assets/14_Basement_32x32.png");
    this.load.image(
      "systemIMG",
      "assets/17_Visibile_Upstairs_System_32x32.png"
    );
    this.load.image("jailIMG", "assets/18_Jail_32x32.png");
    this.load.image("buildingIMG", "assets/Buildings32x32.png");
    this.load.image("carpetIMG", "assets/Carpet.png");
    this.load.image("defimonIMG", "assets/defimon3.png");

    this.load.spritesheet("gen", "assets/cat.png", {frameWidth: 32,frameHeight: 32,});
    this.load.spritesheet('key', 'assets/key.png',{ frameWidth:32, frameHeight:32 });
    this.load.spritesheet('cockroach', 'assets/cockroach.png',{ frameWidth:64.5, frameHeight:64 });
    this.load.spritesheet('electric', 'assets/strongcockroach.png',{ frameWidth:64, frameHeight:64 });
    this.load.spritesheet('heart', 'assets/life.png',{ frameWidth:64, frameHeight:64 });


  }

  create() {
    console.log("level2");

    this.anims.create({
      key:'keyAnim',
      frames:this.anims.generateFrameNumbers('key',
      { start:0, end:2 }),
      frameRate:5,
      repeat:-1
  });

  this.anims.create({
    key:'heartAnim',
    frames:this.anims.generateFrameNumbers('heart',
    { start:0, end:1 }),
    frameRate:5,
    repeat:-1
});

this.anims.create({
  key:'electric-rightAnim',
  frames:this.anims.generateFrameNumbers('electric',
  { start:3, end:5 }),
  frameRate:5,
  repeat:-1
});

this.anims.create({
  key:'electric-leftAnim',
  frames:this.anims.generateFrameNumbers('electric',
  { start:6, end:8 }),
  frameRate:5,
  repeat:-1
});

this.anims.create({
  key:'electric-upAnim',
  frames:this.anims.generateFrameNumbers('electric',
  { start:0, end:2 }),
  frameRate:5,
  repeat:-1
});

this.anims.create({
  key:'electric-downAnim',
  frames:this.anims.generateFrameNumbers('electric',
  { start:9, end:11 }),
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
    let map = this.make.tilemap({ key: "level2" });

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
    this.table = map.createLayer("table", tilesArray, 0, 0);
    this.furniture = map.createLayer("furniture", tilesArray, 0, 0);
    this.furniture2 = map.createLayer("furniture2", tilesArray, 0, 0);
    this.computer = map.createLayer("computer", tilesArray, 0, 0);

    var key3Down = this.input.keyboard.addKey(52);

    key3Down.on(
      "down",
      function () {
        console.log("Key 4 pressed");
        this.scene.start("level3");
      },
      this
    );

    let start = map.findObject("objectLayer", (obj) => obj.name === "start");
    this.player = this.physics.add
      .sprite(start.x, start.y, "gen")
      .setScale(1.4);
    window.player = this.player;

    this.physics.world.bounds.width = this.ground.width;
    this.physics.world.bounds.height = this.ground.height;

    // this.player = this.physics.add.sprite(100, 100, "gen").setScale(1.7);
    // window.player = this.player;

    // load objects from the map
    let key = map.findObject("objectLayer", (obj) => obj.name === "key");
    let heart = map.findObject("objectLayer", (obj) => obj.name === "life");
    let electric = map.findObject("objectLayer", (obj) => obj.name === "electric");
    let electric2 = map.findObject("objectLayer", (obj) => obj.name === "electric2");
    let electric3 = map.findObject("objectLayer", (obj) => obj.name === "electric3");
    let electric4 = map.findObject("objectLayer", (obj) => obj.name === "electric4");
   
   
    this.key = this.physics.add.sprite(key.x, key.y, "key").play("keyAnim").setScale(1.5);
    this.heart = this.physics.add.sprite(heart.x, heart.y, "heart").play("heartAnim");
    this.electric = this.physics.add.sprite(electric.x, electric.y, "electric").play("electric-leftAnim");
    this.electric2 = this.physics.add.sprite(electric2.x, electric2.y, "electric").play("electric-rightAnim");
    this.electric3 = this.physics.add.sprite(electric3.x, electric3.y, "electric").play("electric-rightAnim");
    this.electric4 = this.physics.add.sprite(electric4.x, electric4.y, "electric").play("electric-leftAnim");


      // in create, add tweens
      
      this.tweens.add({
        targets: this.electric,
        x: 10,
        //flipX: true,
        yoyo: true,
        duration: 1700,
        repeat: -1
    })

    this.tweens.add({
      targets: this.electric2,
      x: 925,
      //flipX: true,
      yoyo: true,
      duration: 1700,
      repeat: -1
  })

    this.tweens.add({
      targets: this.electric3,
      x: 925,
      //flipX: true,
      yoyo: true,
      duration: 1700,
      repeat: -1
  })

  this.tweens.add({
    targets: this.electric4,
    x: 10,
    //flipX: true,
    yoyo: true,
    duration: 1700,
    repeat: -1
})

// When object overlap with player, call the this.collectFire function
this.physics.add.overlap(this.player, this.key, this.collectKey, null, this);
this.physics.add.overlap(this.player, this.heart, this.collectHeart, null, this);
this.physics.add.overlap(this.player, this.electric, this.hitElectric, null, this);
this.physics.add.overlap(this.player, this.electric2, this.hitElectric, null, this);
this.physics.add.overlap(this.player, this.electric3, this.hitElectric, null, this);
this.physics.add.overlap(this.player, this.electric4, this.hitElectric, null, this);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);

    this.wall.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.wall);

    this.wall2.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.wall2);

    this.table.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.table);

    this.furniture.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.furniture);

    this.furniture2.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.furniture2);

    this.computer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.computer);

    this.player.body
      .setSize(this.player.width * 0.3, this.player.height * 0.3)
      .setOffset(12, 22);

    this.physics.world.bounds.width = this.ground.width;
    this.physics.world.bounds.height = this.ground.height;

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
      this.player.x > 485 &&
      this.player.x < 541 &&
      this.player.y < 88 
  
     ) {
       console.log("lobby");
       this.lobby();
  }
    
  } // end of update //
  //call this function when overlap
  collectKey(player, item) {
    console.log("collect key");
    item.disableBody(true, true); // remove fire
    return false;
    
  }

  collectHeart(player, item) {
    console.log("collect heart");
    item.disableBody(true, true); // remove fire
    return false;
    
  }

 // this function is called when player touch the fire
 hitElectric(player, item) {
  console.log("hit electric");
  this.cameras.main.shake(200);
  return false;
}

  lobby(player, tile) {
    console.log("lobby function");
    this.scene.start("lobby",);
 }

}
