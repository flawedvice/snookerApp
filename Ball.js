class Ball {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.maxSpeed = 10;

		const options = {
			restitution: 1.1, // bounciness
			friction: 0.4,
			isSensor: true,
			label: "ball",
		};
		this.body = Bodies.circle(this.x, this.y, BALL_DIAMETER / 2, options);

		Composite.add(world, this.body);
	}

	draw() {
		if (this.body) {
			push();
			fill(this.color);
			circle(this.body.position.x, this.body.position.y, BALL_DIAMETER);
			pop();
		}
	}

	update() {
		const isCueBall = this.color === "white";
		if (!Composite.allBodies(world).includes(this.body)) {
			if (isCueBall) {
				this.body.position.y = 200;
			} else this.body = null;
		} else {
			if (Body.getSpeed(this.body) > this.maxSpeed) {
				Body.setSpeed(this.body, this.maxSpeed);
			}
		}
	}

	run() {
		this.update();
		this.draw();
	}
}
