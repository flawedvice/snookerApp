// Module aliases
let Engine = Matter.Engine,
	Composite = Matter.Composite,
	Body = Matter.Body,
	Bodies = Matter.Bodies,
	Mouse = Matter.Mouse,
	MouseConstraint = Matter.MouseConstraint,
	Events = Matter.Events;

// Matter.js objects
let engine;
let canvas;
let mouse;
let mouseConstraint;

// Elements
let table;
let game;
let cue;
let cueBall;

function setup() {
	/// Environment configuration
	setUpP5();
	/// Matter.js setup
	// Create engine
	engine = Engine.create({ gravity: { y: 0 } });

	/// Elements setup
	table = new Table();
	game = new Game();
	cue = new Cue();
	cueBall = new Ball("white", D_ZONE_LINE_X - 50, 200, "cue Ball", 0x0002);

	// Mouse interactions
	mouse = Mouse.create(canvas.elt);
	const mouseParams = { mouse };
	mouseConstraint = MouseConstraint.create(engine, mouseParams);
	Composite.add(engine.world, mouseConstraint);

	setUpGrabbing();
	setUpCollisions();
}

function draw() {
	background("lightblue");

	/// Update objects positions and physics
	Engine.update(engine);

	/// Draw objects
	table.run();
	game.run();
	cueBall.run();
	//cue.run();
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
