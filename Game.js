class Game {
	topLimit = height / 2 - TABLE_WIDTH / 2 + CUSHION_WIDTH;
	bottomLimit = height / 2 + TABLE_WIDTH / 2 - CUSHION_WIDTH;
	leftLimit = width / 2 - TABLE_LENGTH / 2 + CUSHION_WIDTH;
	rightLimit = width / 2 + TABLE_LENGTH / 2 - CUSHION_WIDTH;

	constructor() {
		this.placeColorBalls();
		this.placeRedBalls();

		this.table = new Table();
		cueBall = new Ball(
			BALLS.cue.x,
			BALLS.cue.y,
			BALLS.cue.color,
			BALLS.cue.id
		);
	}

	draw() {
		this.table.run();
		this.redBalls.forEach((ball) => ball.run());
		this.colorBalls.forEach((ball) => ball.run());
		cueBall.run();
	}

	run() {
		this.draw();
	}

	placeRedBalls(mode) {
		this.redBalls = [];
		if (mode === "random") {
			for (let i = 0; i < 15; i++) {
				this.redBalls.push(
					new Ball(
						random(this.leftLimit, this.rightLimit),
						random(this.bottomLimit, this.topLimit),
						"red",
						i + 7
					)
				);
			}
		} else {
			let startHeight = 0;
			let gap = 2;
			let baseX = width / 2 + TABLE_LENGTH / 4 + gap,
				baseY = height / 2;
			let x, y;
			let id = 7;
			for (let i = 1; i <= 5; i++) {
				// Columns
				baseX += gap;
				baseY = height / 2;
				for (let j = 1; j <= i; j++) {
					// Rows
					baseY += gap;
					x = baseX + BALL_DIAMETER * i;
					y = baseY + startHeight + BALL_DIAMETER * (j - 1);
					this.redBalls.push(new Ball(x, y, "red", id));
					id++;
				}
				startHeight -= BALL_DIAMETER / 2 + gap;
			}
		}
	}

	placeColorBalls(mode) {
		if (mode === "random") {
			this.colorBalls = [
				new Ball(
					random(this.leftLimit, this.rightLimit),
					random(this.bottomLimit, this.topLimit),
					BALLS.orange.color,
					BALLS.orange.id
				),
				new Ball(
					random(this.leftLimit, this.rightLimit),
					random(this.bottomLimit, this.topLimit),
					BALLS.green.color,
					BALLS.green.id
				),
				new Ball(
					random(this.leftLimit, this.rightLimit),
					random(this.bottomLimit, this.topLimit),
					BALLS.yellow.color,
					BALLS.yellow.id
				),
				new Ball(
					random(this.leftLimit, this.rightLimit),
					random(this.bottomLimit, this.topLimit),
					BALLS.blue.color,
					BALLS.blue.id
				),
				new Ball(
					random(this.leftLimit, this.rightLimit),
					random(this.bottomLimit, this.topLimit),
					BALLS.purple.color,
					BALLS.purple.id
				),
				new Ball(
					random(this.leftLimit, this.rightLimit),
					random(this.bottomLimit, this.topLimit),
					BALLS.black.color,
					BALLS.black.id
				),
			];
		} else {
			this.colorBalls = [
				new Ball(
					BALLS.orange.x,
					BALLS.orange.y,
					BALLS.orange.color,
					BALLS.orange.id
				),
				new Ball(
					BALLS.green.x,
					BALLS.green.y,
					BALLS.green.color,
					BALLS.green.id
				),
				new Ball(
					BALLS.yellow.x,
					BALLS.yellow.y,
					BALLS.yellow.color,
					BALLS.yellow.id
				),
				new Ball(
					BALLS.blue.x,
					BALLS.blue.y,
					BALLS.blue.color,
					BALLS.blue.id
				),
				new Ball(
					BALLS.purple.x,
					BALLS.purple.y,
					BALLS.purple.color,
					BALLS.purple.id
				),
				new Ball(
					BALLS.black.x,
					BALLS.black.y,
					BALLS.black.color,
					BALLS.black.id
				),
			];
		}
	}
}
