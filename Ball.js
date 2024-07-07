class Ball {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.body = Bodies.circle(this.x, this.y, BALL_DIAMETER / 2);

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
		}
	}

	run() {
		this.update();
		this.draw();
	}
}
