class Ball {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.maxSpeed = 10;

		let label = "colour ball";
		if (color === "white") {
			label = "cue ball";
		} else if (color === "red") {
			label = "red ball";
		}

		const options = {
			restitution: 1.1, // bounciness
			friction: 0.4,
			isSensor: true,
			label,
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
}
