/**
 * Commentary:
 *
 * An instruction set, failure alerts, collision detection, and even a
 * crosshair are some of the features implemented in this unique snooker app.
 *
 * With a modular design based on the Object Oriented Programming paradigm,
 * this game is easily extensible, it helps its readability, and a clear
 * separation of concerns where every element is an independent entity with its
 * drawing methods, event control, and other inner mechanisms.
 *
 * As per the functionality, is worth noting that:
 * - A separation between aiming and pushing the cue was deemed optimal as it
 * 	would allow the users to point using their mouse and shoot the cue ball
 * 	using the space bar.
 * - To avoid annoying issues raised at the moment of aiming, the cue becomes
 * 	fixed to the cue ball as soon it has stopped moving and is on the table's
 * 	cloth.
 * - An ordering algorithm was set in place to set the position of every ball
 * 	depending on what the user desires: a randomized play, or a more common one,
 * 	for adventurers and purists.
 * - Balls, as soon as they are lost, get to their original position so the
 * 	user can keep playing without interruptions.
 * - A useful timer was placed in the left-bottom corner to keep track of the
 * 	gameplay time, as it also is reseted when the layout is changed by the user
 * 	with the "layout-modifier" keys (`1`, `2`, and `3`).
 *
 * What I'm most proud of it the crosshair and timer implementations, as
 * they are features that were born out of the necessity of better testing, but
 * also made the game significantly more enjoyable.
 */

let game;

function setup() {
	/// Environment configuration
	configP5();
	configMatter();
	configMouse();

	game = new Game();

	Composite.allBodies(world).forEach((body) => {
		if (body.label.includes("ball")) {
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
		console.log("Pressed 1");
		game.placeRedBalls();
		game.placeColorBalls();
		game.resetTimer();
	} else if (key === "2") {
		console.log("Pressed 2");
		game.placeRedBalls("random");
		game.placeColorBalls();
		game.resetTimer();
	} else if (key === "3") {
		console.log("Pressed 3");
		game.placeRedBalls("random");
		game.placeColorBalls("random");
		game.resetTimer();
	} else if (keyCode === 32) {
		console.log("Hitting cue");
		cue.releaseForce();
	}
}
