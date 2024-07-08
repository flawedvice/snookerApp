// MatterJS variables
let Engine,
	Render,
	Runner,
	Events,
	Composite,
	Mouse,
	MouseConstraint,
	Bodies,
	Body,
	Vector;

let engine, world, mouse, mouseContraint;

// Interaction variables
let canvas;

// Elements variables
let cueBall, cue;

// Game variables
let pottedColor = 0;

function configP5() {
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	background("lightblue");
	rectMode(CENTER);
	ellipseMode(CENTER);
	angleMode(DEGREES);
}

function configMatter() {
	Engine = Matter.Engine;
	Render = Matter.Render;
	Runner = Matter.Runner;
	Events = Matter.Events;
	Composite = Matter.Composite;
	Mouse = Matter.Mouse;
	MouseConstraint = Matter.MouseConstraint;
	Bodies = Matter.Bodies;
	Body = Matter.Body;
	Vector = Matter.Vector;

	const engineOpts = {
		gravity: { y: 0 },
	};
	engine = Engine.create(engineOpts);
	world = engine.world;

	Engine.run(engine);
}

function configMouse() {
	mouse = Mouse.create(canvas.elt);
	const options = { mouse };
	mouseConstraint = MouseConstraint.create(engine, options);
	Composite.add(world, mouseConstraint);

	Events.on(mouseConstraint, "mousemove", ({ mouse }) => {
		const { x: ballX, y: ballY } = cueBall.body.position;
		const { x, y } = mouse.position;

		const onX =
			x >= ballX - BALL_DIAMETER / 2 && x <= ballX + BALL_DIAMETER / 2;
		const onY =
			y >= ballY - BALL_DIAMETER / 2 && y <= ballY + BALL_DIAMETER / 2;

		if (onX && onY) {
			cursor("GRAB");
		} else {
			cursor();
		}
		//Body.setPosition(cue.body, mouse.position.x, mouse.position.y);
	});

	Events.on(mouseConstraint, "startdrag", (event) => {
		const body = event.body;
		if (body.label.includes("ball")) body.isSensor = true;
	});
	Events.on(mouseConstraint, "enddrag", (event) => {
		const body = event.body;
		if (body.label.includes("ball")) body.isSensor = false;
	});
}
