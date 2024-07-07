class Cushion {
	constructor(position) {
		// position can be bottom, top, right, left
		this.x = 400;
		this.y = 600;

		this.height = 0;
		this.width = 0;
		switch (position) {
			case "top":
				this.height = CUSHION_WIDTH;
				this.width = TABLE_LENGTH;
				this.x = width / 2;
				this.y = height / 2 - TABLE_WIDTH / 2;
				break;
			case "right":
				this.height = TABLE_WIDTH;
				this.width = CUSHION_WIDTH;
				this.x = width / 2 - TABLE_LENGTH / 2;
				this.y = height / 2;
				break;
			case "bottom":
				this.height = CUSHION_WIDTH;
				this.width = TABLE_LENGTH;
				this.x = width / 2;
				this.y = height / 2 + TABLE_WIDTH / 2;
				break;
			case "left":
				this.height = TABLE_WIDTH;
				this.width = CUSHION_WIDTH;
				this.x = width / 2 + TABLE_LENGTH / 2;
				this.y = height / 2;
				break;
			default:
				this.height = CUSHION_WIDTH;
				this.width = TABLE_LENGTH;
				this.x = width / 2;
				this.y = height / 2 + TABLE_WIDTH / 2;
				break;
		}

		const options = {
			isStatic: true,
			label: "cushion",
		};
		this.body = Bodies.rectangle(
			this.x,
			this.y,
			this.width,
			this.height,
			options
		);
		Composite.add(world, this.body);
	}

	draw() {
		push();
		noStroke();
		fill(brown);
		rect(
			this.body.position.x,
			this.body.position.y,
			this.width,
			this.height
		);
		pop();
	}

	run() {
		this.draw();
	}
}
