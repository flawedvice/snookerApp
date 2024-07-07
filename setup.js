function setUpGrabbing() {
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
}

function setUpCollisions() {
	const bodies = game.balls.map((ball) => ball.body);
	bodies.push(cueBall.body);
	bodies.forEach((body) => (body.isSensor = false));
}

function setUpP5() {
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	background("lightblue");
	rectMode(CENTER);
	ellipseMode(CENTER);
	angleMode(DEGREES);
}
