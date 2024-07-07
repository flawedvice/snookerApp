// Module aliases
let Engine = Matter.Engine,
	Render = Matter.Render,
	Composite = Matter.Composite,
	Body = Matter.Body,
	Bodies = Matter.Bodies;

// Matter.js objects
let engine;
let physicBall;

// Elements
let table;
let game;
let cue;
let cueBall;

let ground, ball, body;

function setup() {
	/// Environment configuration
	createCanvas(window.innerWidth, window.innerHeight);
	background("lightblue");
	rectMode(CENTER);
	ellipseMode(CENTER);

	/// Matter.js setup
	// Create engine
	engine = Engine.create({ gravity: { y: 1 } });

	/// Elements setup
	table = new Table();
	game = new Game();
	//cue = new Cue();
	console.log(D_ZONE_LINE_X);
	cueBall = new Ball("white", D_ZONE_LINE_X - 50, height / 2);
}

function draw() {
	background("lightblue");

	/// Update objects positions and physics
	Engine.update(engine);

	/// Draw objects
	table.ballInPocket(cueBall);
	table.draw();

	//cue.run();

	game.draw();
	cueBall.draw();
}

/**
 * Change position on key stroke.
 */
function keyReleased() {
	if (key === "2") {
		game = new Game("randomRed");
	} else if (key === "3") {
		game = new Game("randomAll");
	} else if (key === "1") {
		game = new Game();
	}
}

function mouseMoved() {}
