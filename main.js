let game;

function setup() {
	/// Environment configuration
	configP5();
	configMatter();
	configMouse();

	game = new Game();
}

function draw() {
	Engine.update(engine);

	background("lightblue");

	game.run();
}
