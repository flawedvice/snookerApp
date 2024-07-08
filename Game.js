class Game {
	constructor() {
		this.placeColorBalls();
		this.placeRedBalls();

		this.table = new Table();

		cue = new Cue();
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
		cue.run();

		this._showCommands();
	}

	run() {
		this.draw();
		if (pottedColor > 0) {
			this._drawAlert();
			if (pottedColor >= 2) {
				this.fail();
			}
		}
	}

	placeRedBalls(mode) {
		this.redBalls = [];
		if (mode === "random") {
			for (let i = 0; i < 15; i++) {
				this.redBalls.push(
					new Ball(
						random(leftLimit, rightLimit),
						random(bottomLimit, topLimit),
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
					random(leftLimit, rightLimit),
					random(bottomLimit, topLimit),
					BALLS.orange.color,
					BALLS.orange.id
				),
				new Ball(
					random(leftLimit, rightLimit),
					random(bottomLimit, topLimit),
					BALLS.green.color,
					BALLS.green.id
				),
				new Ball(
					random(leftLimit, rightLimit),
					random(bottomLimit, topLimit),
					BALLS.yellow.color,
					BALLS.yellow.id
				),
				new Ball(
					random(leftLimit, rightLimit),
					random(bottomLimit, topLimit),
					BALLS.blue.color,
					BALLS.blue.id
				),
				new Ball(
					random(leftLimit, rightLimit),
					random(bottomLimit, topLimit),
					BALLS.purple.color,
					BALLS.purple.id
				),
				new Ball(
					random(leftLimit, rightLimit),
					random(bottomLimit, topLimit),
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

	_drawAlert() {
		push();
		rect(width - 200, 85, 300, 100, 6);
		fill("red");
		textAlign(CENTER, TOP);
		text("ALERT", width - 200, 65);
		text("Dropped  balls: " + pottedColor, width - 200, 85);
		pop();
	}

	fail() {
		push();
		fill("grey");
		rect(
			width / 2,
			height / 2,
			TABLE_LENGTH + CUSHION_WIDTH * 2,
			TABLE_WIDTH + CUSHION_WIDTH * 2
		);
		fill("red");
		textSize(100);
		textAlign(CENTER, TOP);
		text("FAILED", width / 2, height / 4 + 50);
		textSize(50);
		fill("black");
		text(
			"Potted colour balls twice. Reload browser to continue.",
			width / 2,
			height / 2
		);
		pop();
	}

	_showCommands() {
		push();
		rect(220, 110, 340, 130, 6);
		fill("grey");
		textAlign(LEFT, TOP);
		text("Change the layout using the '1', '2', and '3' keys.", 80, 65);
		text("Grab the cue ball to place it in the table.", 80, 85);
		text('Press "spacebar" to push the cue ball.', 80, 105);
		text("Pot two coloured balls and you fail", 80, 125);
		text("Pot as many red balls as you can!", 80, 145);
		noStroke();
		circle(75, 70, 4);
		circle(75, 90, 4);
		circle(75, 110, 4);
		circle(75, 130, 4);
		pop();
	}
}
