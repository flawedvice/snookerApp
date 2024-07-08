class Cue {
	constructor() {
		this.start = createVector(200, 400);
		this.end = createVector(this.start.x + TABLE_WIDTH, this.start.y + 4);

		this.angle = this.start.angleBetween(this.end);
		this.direction = this.start.copy();

		this.force = 0;
		this.forceStep = 0.01;
		this.maxForce = 0.06;

		this.ballAvailable = true;
	}

	draw() {
		if (this.ballAvailable) {
			push();
			stroke("#966F33");
			strokeWeight(3);
			fill("#966F33");
			translate(this.start.x, this.start.y);
			line(0, 0, this.end.x, this.end.y);
			pop();
		}
	}

	update() {
		// Update position
		const { x, y } = cueBall.body.position;
		this.start = createVector(x, y);
		let preEnd = createVector(mouseX - x, mouseY - y);
		preEnd.normalize();
		this.end = preEnd.mult(TABLE_WIDTH);

		// Update availability
		const onX = x > leftLimit && x < rightLimit;
		const onY = y > topLimit && y < bottomLimit;
		const isStatic = Body.getSpeed(cueBall.body) < 1;

		if (onX && onY && isStatic) {
			this.ballAvailable = true;
		} else this.ballAvailable = false;

		// Update angle & direction
		if (this.ballAvailable) {
			this.direction = createVector(x, y).sub(
				createVector(mouseX, mouseY)
			);
			this.direction.normalize();
			this.direction.y *= -1;
		}

		// Update force
		if (keyIsDown(32) && this.force < this.maxForce) {
			this.force += this.forceStep;
		}
	}

	run() {
		this.update();
		this.draw();
	}

	releaseForce() {
		if (this.ballAvailable) {
			const ball = cueBall.body;
			if (this.force > this.maxForce) {
				this.force = this.maxForce;
			}

			let forceVector = this.direction.mult(this.force);

			Body.applyForce(ball, ball.position, {
				x: forceVector.x,
				y: -forceVector.y,
			});
			this.force = 0;
		}
	}
}
