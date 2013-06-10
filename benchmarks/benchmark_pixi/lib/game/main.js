ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'plugins.pixi',
	'plugins.stats'
)
.defines(function(){

var COUNT = 1000;

Bunny = ig.Class.extend({
	image: new ig.Asset("media/bunny.png"),
	sprite: null,

	init: function(x,y) {
		this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage("media/bunny.png"));
		this.sprite.position.x = x;
		this.sprite.position.y = y;
		ig.system.stage.addChild(this.sprite);
	},

	update: function() {
		this.sprite.position.y += 50 * ig.system.tick;
		if(this.sprite.position.y > ig.system.height) this.sprite.position.y = 0;
	}
});

MyGame = ig.Game.extend({
	clearColor: "#ffffff",
	interactive: true,
	sprites: [],

	init: function() {
		this.parent();

		for (var i = 0; i < COUNT; i++) {
			this.sprites.push(new Bunny(Math.random()*ig.system.width,Math.random()*ig.system.height));
		};
	},

	update: function() {
		for (var i = 0; i < this.sprites.length; i++) {
			this.sprites[i].update();
		};
		this.parent();
	}
});

ig.System.debug = true;

ig.main("#canvas", MyGame, 60, 1024, 672);

});