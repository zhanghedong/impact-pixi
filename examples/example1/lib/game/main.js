ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'plugins.pixi'
)
.defines(function(){

Bunny = ig.Class.extend({
	image: new ig.Asset("media/bunny.png"),
	sprite: null,

	init: function(x,y) {
		this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage("media/bunny.png"));
		this.sprite.position.x = x;
		this.sprite.position.y = y;
		this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
		this.sprite.scale.x = this.sprite.scale.y = Math.random() + 0.5;
		ig.system.stage.addChild(this.sprite);
	},

	update: function() {
		this.sprite.rotation += 5 * ig.system.tick;
		this.sprite.position.y += 50 * ig.system.tick;
		if(this.sprite.position.y > ig.system.height) this.kill();
	},

	kill: function() {
		ig.system.stage.removeChild(this.sprite);
		ig.game.sprites.erase(this);
	}
});

MyGame = ig.Game.extend({
	clearColor: "#cccccc",
	interactive: true,
	sprites: [],

	click: function(event) {
		this.sprites.push(new Bunny(event.global.x, event.global.y));
	},

	update: function() {
		for (var i = 0; i < this.sprites.length; i++) {
			this.sprites[i].update();
		};
		this.parent();
	}
});

ig.main("#canvas", MyGame, 60, 1024, 672);

});