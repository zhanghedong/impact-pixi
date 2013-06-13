ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'plugins.stats'
)
.defines(function(){

var COUNT = 1000;

Bunny = ig.Class.extend({
	image: new ig.Image("media/bunny.png"),
	pos: {x:0, y:0},

	init: function(x,y) {
		this.pos.x = x;
		this.pos.y = y;
	},

	update: function() {
		this.pos.y += 50 * ig.system.tick;
		if(this.pos.y > ig.system.height) this.pos.y = 0;
	},

	draw: function() {
		this.image.draw(this.pos.x, this.pos.y);
	}
});

MyGame = ig.Game.extend({
	clearColor: "#ffffff",
	sprites: [],

	init: function() {
		for (var i = 0; i < COUNT; i++) {
			this.sprites.push(new Bunny(Math.random()*ig.system.width,Math.random()*ig.system.height));
		};
	},

	update: function() {
		this.parent();
		for (var i = 0; i < this.sprites.length; i++) {
			this.sprites[i].update();
		};
	},

	draw: function() {
		this.parent();
		for (var i = 0; i < this.sprites.length; i++) {
			this.sprites[i].draw();
		};
	}
});

ig.System.debug = true;

ig.main("#canvas", MyGame, 60, window.innerWidth, window.innerHeight);

});