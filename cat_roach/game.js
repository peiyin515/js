
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    backgroundColor: '#000000',
    scene: [mainScene, storylineScene, missionScene, level1missionScene,level1ruleScene, lobby, level1, level2ruleScene, level2,level3ruleScene,level3, gameOver,winScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },

};

let game = new Phaser.Game(config);
window.heart=3
window.spray=0
window.key=0
window.cockroach=8;

