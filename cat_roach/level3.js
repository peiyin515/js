class level3 extends Phaser.Scene {
  constructor() {
    super({ key: "level3" });
  }

  // Put global variable here

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("level3", "assets/level3.tmj");

    // Step 2 : Preload any images here

    this.load.image("genericIMG", "assets/1_Generic_32x32.png");
    this.load.image("basementIMG", "assets/14_Basement_32x32.png");
    this.load.image(
      "systemIMG",
      "assets/17_Visibile_Upstairs_System_32x32.png"
    );
    this.load.image("carpetIMG", "assets/Carpet.png");
    this.load.image("defimonIMG", "assets/defimon3.png");

    this.load.spritesheet("gen", "assets/cat.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("cockroach", "assets/cockroach.png", {
      frameWidth: 64.5,
      frameHeight: 64,
    });
    this.load.spritesheet("electric", "assets/strongcockroach.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    console.log("level3");

    this.anims.create({
      key: "electric-rightAnim",
      frames: this.anims.generateFrameNumbers("electric", { start: 3, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "electric-leftAnim",
      frames: this.anims.generateFrameNumbers("electric", { start: 6, end: 8 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "electric-upAnim",
      frames: this.anims.generateFrameNumbers("electric", { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "electric-downAnim",
      frames: this.anims.generateFrameNumbers("electric", {
        start: 9,
        end: 11,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "cockroach-upAnim",
      frames: this.anims.generateFrameNumbers("cockroach", {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "cockroach-rightAnim",
      frames: this.anims.generateFrameNumbers("cockroach", {
        start: 2,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "cockroach-leftAnim",
      frames: this.anims.generateFrameNumbers("cockroach", {
        start: 4,
        end: 5,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "cockroach-downAnim",
      frames: this.anims.generateFrameNumbers("cockroach", {
        start: 6,
        end: 7,
      }),
      frameRate: 5,
      repeat: -1,
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
    let map = this.make.tilemap({ key: "level3" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let genericTiles = map.addTilesetImage("1_Generic_32x32", "genericIMG");
    let basementTiles = map.addTilesetImage("14_Basement_32x32", "basementIMG");
    let systemTiles = map.addTilesetImage(
      "17_Visibile_Upstairs_System_32x32",
      "systemIMG"
    );
    let carpetTiles = map.addTilesetImage("Carpet", "carpetIMG");
    let defimonTiles = map.addTilesetImage("defimon3", "defimonIMG");

    // Step 5  create an array of tiles
    let tilesArray = [
      genericTiles,
      basementTiles,
      systemTiles,
      carpetTiles,
      defimonTiles,
    ];

    // Step 6  Load in layers by layers
    this.ground = map.createLayer("ground", tilesArray, 0, 0);
    this.wall = map.createLayer("wall", tilesArray, 0, 0);
    this.wall2 = map.createLayer("wall2", tilesArray, 0, 0);
    this.furniture = map.createLayer("furniture", tilesArray, 0, 0);
    this.chair = map.createLayer("chair", tilesArray, 0, 0);
    this.furniture2 = map.createLayer("furniture2", tilesArray, 0, 0);

    let start = map.findObject("objectLayer", (obj) => obj.name === "start");
    this.player = this.physics.add
      .sprite(start.x, start.y, "gen")
      .setScale(1.4);
    window.player = this.player;
    // this.player = this.physics.add.sprite(100, 100, 'gen').setScale(1.7)
    // window.player = this.player

    // load objects from the map
    let electric = map.findObject(
      "objectLayer",
      (obj) => obj.name === "electric"
    );
    let cockroach = map.findObject(
      "objectLayer",
      (obj) => obj.name === "cockroach"
    );

    this.electric = this.physics.add
      .sprite(electric.x, electric.y, "electric")
      .play("electric-downAnim")
      .setScale(2.5);
    this.cockroach = this.physics.add
      .sprite(cockroach.x, cockroach.y, "cockroach")
      .play("cockroach-upAnim")
      .setScale(2.5);

    this.tweens.add({
      targets: this.cockroach,
      y: 770,
      //flipX: true,
      yoyo: true,
      duration: 1000,
      repeat: -1,
    });

    // When object overlap with player, call the this.collectFire function
    this.physics.add.overlap(
      this.player,
      this.electric,
      this.hitElectric,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.cockroach,
      this.hitCockroach,
      null,
      this
    );

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);

    this.wall.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.wall);

    this.wall2.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.wall2);

    this.furniture.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.furniture);

    this.chair.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.chair);

    this.furniture2.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.furniture2);

    this.player.body
      .setSize(this.player.width * 0.3, this.player.height * 0.3)
      .setOffset(12, 22);

    this.physics.world.bounds.width = this.ground.width;
    this.physics.world.bounds.height = this.ground.height;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map
  } // end of create //

  update() {
    // enemy follow after player
    this.physics.moveToObject(this.electric, this.player, 380, 4000);

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

    if (this.player.y > 433 && this.player.y < 556 && this.player.x < 7) {
      console.log("lobby");
      this.lobby();
    }
  } // end of update //

  // this function is called when player touch the fire
  hitElectric(player, item) {
    console.log("hit electric");
    this.cameras.main.shake(200);
    this.scene.start("gameOver")
    return false;
  }

  // this function is called when player touch the fire
  hitCockroach(player, item) {
    console.log("hit cockroach");
    this.cameras.main.shake(200);
    this.scene.start("gameOver")
    return false;
  }

  // Function to jump to room1
  lobby(player, tile) {
    console.log("lobby function");
    this.scene.start("lobby");
  }
}
