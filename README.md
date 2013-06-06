# ImpactPixi

Pixi.js renderer module for Impact

## Example

https://github.com/ekelokorpi/impact-pixi-example

## Module

### Install

Copy `pixi.js` to your `lib/plugins/` folder and require `plugins.pixi` on your game main module.

### Usage

- Your main stage is at `ig.system.stage`.
- Always first call `this.parent();` on your ig.Game class init function.
- Load assets with `ig.Asset()`.

## Loader

You can make your own loader by extending ig.Loader class, there are few new functions on the loader.

- `initStage` init your loader graphcis here.
- `onPercentChange` called when loader percent changes.
- `draw` put your drawing functions here.

### Example

	MyLoader = ig.Loader.extend({
		initStage: function() {
			var canvas = document.createElement("canvas");
			canvas.width = 100;
			canvas.height = 100;
			var ctx = canvas.getContext("2d");
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0,0,100,100);

			this.sprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
			this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
			this.sprite.position.x = ig.system.width / 2;
			this.sprite.position.y = ig.system.height / 2;
			ig.system.stage.addChild(this.sprite);
		},

		draw: function() {
			this.sprite.rotation += 0.2;
		}
	});