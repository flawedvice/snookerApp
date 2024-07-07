class Game {
	constructor() {
		this.redBalls = [];
		for (let i = 0; i < 15; i++) {
			this.redBalls.push(new Ball(width / 2, height / 2, "red"));
		}
		this.placeColorBalls();

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

	placeRedBalls() {}

	placeColorBalls() {
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
