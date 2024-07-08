class Pocket {
	constructor(position) {
		// positions are tc tr r br bc bl l tl
		this.position = position;
		this.size = BALL_DIAMETER * 1.5;
		this.corners = [0, 0, 0, 0];
		const bodyOpts = {
			isStatic: true,
			isSensor: true,
			label: "pocket hole",
		};

		// Select proper position
		switch (this.position) {
			case "tl":
				this.x = width / 2 - TABLE_LENGTH / 2 + (CUSHION_WIDTH * 3) / 4;
				this.y = height / 2 - TABLE_WIDTH / 2 + (CUSHION_WIDTH * 3) / 4;
				this.corners = [10, 0, 0, 0];
				break;
			case "tc":
				this.x = width / 2;
				this.y = height / 2 - TABLE_WIDTH / 2 + (CUSHION_WIDTH * 3) / 4;
				break;
			case "tr":
				this.x = width / 2 + TABLE_LENGTH / 2 - (CUSHION_WIDTH * 3) / 4;
				this.y = height / 2 - TABLE_WIDTH / 2 + (CUSHION_WIDTH * 3) / 4;
				this.corners = [0, 10, 0, 0];
				break;
			case "br":
				this.x = width / 2 + TABLE_LENGTH / 2 - (CUSHION_WIDTH * 3) / 4;
				this.y = height / 2 + TABLE_WIDTH / 2 - (CUSHION_WIDTH * 3) / 4;
				this.corners = [0, 0, 10, 0];
				break;
			case "bc":
				this.x = width / 2;
				this.y = height / 2 + TABLE_WIDTH / 2 - (CUSHION_WIDTH * 3) / 4;
				break;
			case "bl":
				this.x = width / 2 - TABLE_LENGTH / 2 + (CUSHION_WIDTH * 3) / 4;
				this.y = height / 2 + TABLE_WIDTH / 2 - (CUSHION_WIDTH * 3) / 4;
				this.corners = [0, 0, 0, 10];
				break;
		}

		this.body = Bodies.circle(this.x, this.y, this.size / 2, bodyOpts);

		Composite.add(world, this.body);

		this.setEvents();
	}

	setEvents() {
		Events.on(engine, "collisionStart", (event) => {
			const pairs = event.pairs;
			pairs.forEach(({ bodyA, bodyB }) => {
				let toRemove = null;
				if (bodyA === this.body) {
					toRemove = bodyB;
				} else if (bodyB === this.body) {
					toRemove = bodyA;
				}
				if (toRemove && toRemove.label === "red ball") {
					Composite.remove(world, toRemove);
				} else if (toRemove) {
					Ball.toOrigin(toRemove);
				}
			});
		});
	}

	draw() {
		const { x, y } = this.body.position;

		let marginX = 0,
			marginY = 0,
			height = this.size * 1.2;

		if (this.position.includes("b")) {
			marginY = CUSHION_WIDTH / 1.6;
		} else {
			marginY = -CUSHION_WIDTH / 1.6;
		}

		if (this.position.includes("l")) {
			marginX = (-CUSHION_WIDTH * 2) / 4;
			height = this.size;
		} else if (this.position.includes("r")) {
			marginX = (CUSHION_WIDTH * 2) / 4;
		} else {
			height = CUSHION_WIDTH;
		}
		push();
		noStroke();
		fill("goldenrod");
		rect(
			x + marginX,
			y + marginY,
			this.size * 1.2,
			height,
			...this.corners
		);
		fill("black");
		circle(x, y, this.size);
		pop();
	}

	run() {
		this.draw();
	}
}
