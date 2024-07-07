let game;

function setup() {
	/// Environment configuration
	configP5();
	configMatter();
	configMouse();

	game = new Game();

	Composite.allBodies(world).forEach((body) => {
		if (body.label === "ball") {
			body.isSensor = false;
		}
	});
}

function draw() {
	Engine.update(engine);

	background("lightblue");

	game.run();
}

function keyReleased() {
	if (key === "1") {
		game.placeRedBalls();
		game.placeColorBalls();
	} else if (key === "2") {
		game.placeRedBalls("random");
		game.placeColorBalls();
	} else if (key === "3") {
		game.placeRedBalls("random");
		game.placeColorBalls("random");
	}
}
