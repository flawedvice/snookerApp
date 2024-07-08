class Ball {
	constructor(x, y, color, id) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.maxSpeed = 10;

		this.type = "colour";
		if (color === "white") {
			this.type = "cue";
		} else if (color === "red") {
			this.type = "red";
		}

		const options = {
			restitution: 1.1, // bounciness
			friction: 0.4,
			isSensor: true, // to avoid first paint bounces
			label: `${this.type} ball`,
			id,
		};
		this.body = Bodies.circle(this.x, this.y, BALL_DIAMETER / 2, options);

		Composite.add(world, this.body);

		this.setEvents();
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
		// Updates must be depending on if the ball is still being used!
		if (!Composite.allBodies(world).includes(this.body)) {
			if (this.type === "colour") {
				console.log(this.color + " ball potted");
			} else this.body = null;
		} else {
			if (Body.getSpeed(this.body) > this.maxSpeed) {
				Body.setSpeed(this.body, this.maxSpeed);
			}
			let offScreenX =
					this.body.position.x >= width || this.body.position.x <= 0,
				offScreenY =
					this.body.position.y <= 0 ||
					this.body.position.y >= innerHeight;
			if (offScreenX || offScreenY) {
				Ball.toOrigin(this.body);
				console.log(offScreenX, offScreenY);
			}
		}
	}

	run() {
		this.update();
		this.draw();
	}

	setEvents() {
		Events.on(engine, "collisionEnd", (event) => {
			const pairs = event.pairs;
			pairs.forEach((pair) => {
				if (this.color === "white") {
					let message = "cue-";
					if (pair.bodyA === this.body) {
						message += pair.bodyB.label;
						console.log(message);
					} else if (pair.bodyB === this.body) {
						message += pair.bodyA.label;
						console.log(message);
					}
				}
			});
		});
	}

	static toOrigin(ball) {
		const ballId = ball.id;

		let ballOrigin = null;
		if (ballId < 7) {
			if (ballId > 0) pottedColor++;
			ballOrigin = Object.values(BALLS).find(({ id }) => id === ballId);
		}
		const origin = Vector.create(ballOrigin.x, ballOrigin.y);
		Body.setPosition(ball, origin, false);
		Body.setSpeed(ball, 0);
	}
}
