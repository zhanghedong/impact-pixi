ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'plugins.pixi'
)
.defines(function(){

Pixie = ig.Class.extend({
	init: function(x,y) {
		this.sprite = new PIXI.Spine("media/pixie_spine.json");
		this.sprite.position.x = x;
		this.sprite.position.y = y;
		this.sprite.scale.x = this.sprite.scale.y = 0.5;

		this.sprite.state.setAnimationByName("running", true);
		this.sprite.stateData.setMixByName("running", "jump", 0.2);
		this.sprite.stateData.setMixByName("jump", "running", 0.4);

		ig.system.stage.addChild(this.sprite);
	},

	jump: function() {
		this.sprite.state.setAnimationByName("jump", false);
		this.sprite.state.addAnimationByName("running", true);
	},

	update: function() {
		this.sprite.position.x += 400 * ig.system.tick;
		if(this.sprite.position.x > ig.system.width) this.sprite.position.x = 0;
	}
});

MyGame = ig.Game.extend({
	clearColor: "#cccccc",
	interactive: true,
	assets: [
		new ig.Asset("media/pixie.png"),
		new ig.Asset("media/pixie_spritesheet.json"),
		new ig.Asset("media/pixie_spine.json")
	],

	init: function() {
		this.parent();
		this.player = new Pixie(0,600);
	},

	click: function() {
		this.player.jump();
	},

	update: function() {
		this.parent();
		this.player.update();
	}
});

ig.main("#canvas", MyGame, 60, 1024, 672);

});