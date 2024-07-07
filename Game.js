class Game {
	topLimit = height / 2 - TABLE_WIDTH / 2 + CUSHION_WIDTH;
	bottomLimit = height / 2 + TABLE_WIDTH / 2 - CUSHION_WIDTH;
	leftLimit = width / 2 - TABLE_LENGTH / 2 + CUSHION_WIDTH;
	rightLimit = width / 2 + TABLE_LENGTH / 2 - CUSHION_WIDTH;

	constructor() {
		this.placeColorBalls();
		this.placeRedBalls();

		this.table = new Table();
		cueBall = new Ball(width / 2, 200, "white");
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
						"red"
					)
				);
			}
		} else {
			let startHeight = 0;
			let gap = 2;
			let baseX = width / 2 + TABLE_LENGTH / 4 + gap,
				baseY = height / 2;
			let x, y;
			for (let i = 1; i <= 5; i++) {
				// Columns
				baseX += gap;
				baseY = height / 2;
				for (let j = 1; j <= i; j++) {
					// Rows
					baseY += gap;
					x = baseX + BALL_DIAMETER * i;
					y = baseY + startHeight + BALL_DIAMETER * (j - 1);
					this.redBalls.push(new Ball(x, y, "red"));
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
					"orange"
				),
				new Ball(
					random(this.leftLimit, this.rightLimit),
					random(this.bottomLimit, this.topLimit),
					"green"
				),
				new Ball(
					random(this.leftLimit, this.rightLimit),
					random(this.bottomLimit, this.topLimit),
					"yellow"
				),
				new Ball(
					random(this.leftLimit, this.rightLimit),
					random(this.bottomLimit, this.topLimit),
					"blue"
				),
				new Ball(
					random(this.leftLimit, this.rightLimit),
					random(this.bottomLimit, this.topLimit),
					"purple"
				),
				new Ball(
					random(this.leftLimit, this.rightLimit),
					random(this.bottomLimit, this.topLimit),
					"black"
				),
			];
		} else {
			this.colorBalls = [
				new Ball(ZONE_D_LINE, height / 2, "orange"),
				new Ball(ZONE_D_LINE, height / 2 - TABLE_WIDTH / 6, "green"),
				new Ball(ZONE_D_LINE, height / 2 + TABLE_WIDTH / 6, "yellow"),
				new Ball(width / 2, height / 2, "blue"),
				new Ball(width / 2 + TABLE_LENGTH / 4, height / 2, "purple"),
				new Ball(
					width / 2 + TABLE_LENGTH / 2 - TABLE_LENGTH / 8,
					height / 2,
					"black"
				),
			];
		}
	}
}
