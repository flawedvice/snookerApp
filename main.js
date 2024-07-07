// Module aliases
let Engine = Matter.Engine,
	Render = Matter.Render,
	Composite = Matter.Composite,
	Body = Matter.Body,
	Bodies = Matter.Bodies,
	Mouse = Matter.Mouse,
	MouseConstraint = Matter.MouseConstraint;

// Matter.js objects
let engine;
let canvas;
let mouse;

// Elements
let table;
let game;
let cue;
let cueBall;

let ground, ball, body;

function setup() {
	/// Environment configuration
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	background("lightblue");
	rectMode(CENTER);
	ellipseMode(CENTER);

	/// Matter.js setup
	// Create engine
	engine = Engine.create({ gravity: { y: -1 } });

	mouse = Mouse.create(canvas.elt);
	const mouseParams = { mouse };
	const mouseConstraint = MouseConstraint.create(engine, mouseParams);
	Composite.add(engine.world, mouseConstraint);

	/// Elements setup
	table = new Table();
	game = new Game();
	cue = new Cue();
	cueBall = new Ball("white", D_ZONE_LINE_X - 50, height / 2);
}

function draw() {
	background("lightblue");

	/// Update objects positions and physics
	Engine.update(engine);

	/// Draw objects
	table.run();
	game.run();
	cueBall.run();
	cue.run();
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
