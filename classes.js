class Table {
	constructor() {
		this.length = TABLE_LENGTH;
		this.width = TABLE_WIDTH;
		this.cornerRadius = 10;
		this.top = -this.width / 2 + TABLE_CUSHIONS / 2;
		this.bottom = this.width / 2 - TABLE_CUSHIONS / 2;
		this.right = this.width - TABLE_CUSHIONS / 2;
		this.left = -this.width + TABLE_CUSHIONS / 2;
		const options = {
			isStatic: true,
			restitution: 0.2,
			friction: 1,
			label: "cushion",
		};
		this.cushions = [
			Bodies.rectangle(
				width / 2,
				height / 2 + TABLE_WIDTH / 2 - TABLE_CUSHIONS / 2,
				TABLE_LENGTH,
				TABLE_CUSHIONS,
				options
			),
			Bodies.rectangle(
				width / 2,
				height / 2 - TABLE_WIDTH / 2 + TABLE_CUSHIONS / 2,
				TABLE_LENGTH,
				TABLE_CUSHIONS,
				options
			),
			Bodies.rectangle(
				width / 2 - TABLE_LENGTH / 2 + TABLE_CUSHIONS / 2,
				height / 2,
				TABLE_CUSHIONS,
				TABLE_WIDTH,
				options
			),
			Bodies.rectangle(
				width / 2 + TABLE_LENGTH / 2 - TABLE_CUSHIONS / 2,
				height / 2,
				TABLE_CUSHIONS,
				TABLE_WIDTH,
				options
			),
		];
		Composite.add(engine.world, this.cushions);
	}

	draw() {
		this._drawCushions();

		this._drawCloth();

		this._drawPockets();

		this._drawDZone();
	}

	_drawCushions() {
		for (const cush of this.cushions) {
			push();
			fill(COLORS.get("brown"));
			const pos = cush.position;
			translate(pos.x, pos.y);
			const width = cush.bounds.max.x - cush.bounds.min.x,
				height = cush.bounds.max.y - cush.bounds.min.y;
			rect(0, 0, width, height, this.cornerRadius);
			pop();
		}
	}
	_drawCloth() {
		push();
		translate(width / 2, height / 2);
		fill(COLORS.get("green"));
		rect(
			0,
			0,
			this.length - 2 * TABLE_CUSHIONS,
			this.width - 2 * TABLE_CUSHIONS
		);
		pop();
	}
	_drawPockets() {
		// Draw pockets
		push();
		translate(width / 2, height / 2);

		fill(COLORS.get("gold"));

		const pad = TABLE_CUSHIONS / 2;

		const pockets = [
			// Top Center
			[[0, this.top], [0], [0, pad]],
			// Bottom Center
			[[0, this.bottom], [0], [0, -pad]],
			// Top Right
			[
				[this.right, this.top],
				[0, this.cornerRadius, 0, this.cornerRadius],
				[-pad, pad],
			],
			// Bottom Right
			[
				[this.right, this.bottom],
				[this.cornerRadius, 0, this.cornerRadius, 0],
				[-pad, -pad],
			],
			// Bottom Left
			[
				[this.left, this.bottom],
				[0, this.cornerRadius, 0, this.cornerRadius],
				[pad, -pad],
			],
			// Top Left
			[
				[this.left, this.top],
				[this.cornerRadius, 0, this.cornerRadius, 0],
				[pad, pad],
			],
		];

		for (let i = 0; i < pockets.length; i++) {
			const [origin, corners, _] = pockets[i];
			push();
			translate(...origin);
			switch (i) {
				case 2:
					rect(
						-TABLE_CUSHIONS / 4,
						TABLE_CUSHIONS / 4,
						TABLE_CUSHIONS * 1.5,
						TABLE_CUSHIONS * 1.5,
						...corners
					);
					break;
				case 3:
					rect(
						-TABLE_CUSHIONS / 4,
						-TABLE_CUSHIONS / 4,
						TABLE_CUSHIONS * 1.5,
						TABLE_CUSHIONS * 1.5,
						...corners
					);
					break;
				case 4:
					rect(
						TABLE_CUSHIONS / 4,
						-TABLE_CUSHIONS / 4,
						TABLE_CUSHIONS * 1.5,
						TABLE_CUSHIONS * 1.5,
						...corners
					);
					break;
				case 5:
					rect(
						TABLE_CUSHIONS / 4,
						TABLE_CUSHIONS / 4,
						TABLE_CUSHIONS * 1.5,
						TABLE_CUSHIONS * 1.5,
						...corners
					);
					break;
				default:
					rect(
						0,
						0,
						TABLE_CUSHIONS * 1.5,
						TABLE_CUSHIONS,
						...corners
					);
			}
			pop();
		}

		// Draw holes
		fill("black");
		for (const [origin, _, holeMargin] of pockets) {
			push();
			translate(...origin);
			circle(holeMargin[0], holeMargin[1], BALL_DIAMETER * 1.5);
			pop();
		}

		pop();
	}

	_drawDZone() {
		push();
		stroke("white");
		translate(0, height / 2);
		line(
			D_ZONE_LINE_X,
			this.width / 2 - TABLE_CUSHIONS,
			D_ZONE_LINE_X,
			-this.width / 2 + TABLE_CUSHIONS
		);
		noFill();
		arc(
			D_ZONE_LINE_X,
			0,
			this.width / 3,
			this.width / 3,
			HALF_PI,
			-HALF_PI,
			CHORD
		);
		pop();
	}

	checkBalls() {
		for (const ball in game.redBalls) {
			// Check if in pocket, then remove
		}
	}

	run() {
		this.checkBalls();
		this.draw();
	}
}

class Game {
	constructor(mode) {
		this.balls = [];
		let colorBalls = [
			new Ball(
				COLORS.get("orangeBall"),
				D_ZONE_LINE_X,
				height / 2,
				"orange ball"
			),
			new Ball(
				COLORS.get("greenBall"),
				D_ZONE_LINE_X,
				height / 2 - TABLE_WIDTH / 6,
				"green ball"
			),
			new Ball(
				COLORS.get("yellowBall"),
				D_ZONE_LINE_X,
				height / 2 + TABLE_WIDTH / 6,
				"yellow ball"
			),
			new Ball(
				COLORS.get("blueBall"),
				width / 2,
				height / 2,
				"blue ball"
			),
			new Ball(
				COLORS.get("purpleBall"),
				width / 2 + TABLE_LENGTH / 4,
				height / 2,
				"purple ball"
			),
			new Ball(
				"black",
				width / 2 + TABLE_LENGTH / 2 - TABLE_LENGTH / 8,
				height / 2,
				"black ball"
			),
		];
		this.redBalls = [];

		const xLimits = [
			width / 2 - TABLE_LENGTH / 2 + TABLE_CUSHIONS * 1.5,
			width / 2 + TABLE_LENGTH / 2 - TABLE_CUSHIONS * 1.5,
		];
		const yLimits = [
			height / 2 - TABLE_WIDTH / 2 + TABLE_CUSHIONS * 1.5,
			height / 2 + TABLE_WIDTH / 2 - TABLE_CUSHIONS * 1.5,
		];

		switch (mode) {
			case "randomRed":
				for (let i = 1; i <= 15; i++) {
					this.redBalls.push(
						new Ball(
							COLORS.get("redBall"),
							random(...xLimits),
							random(...yLimits),
							"red ball"
						)
					);
				}
				break;
			case "randomAll":
				colorBalls = [
					new Ball(
						COLORS.get("orangeBall"),
						random(...xLimits),
						random(...yLimits),
						"orange ball"
					),
					new Ball(
						COLORS.get("greenBall"),
						random(...xLimits),
						random(...yLimits),
						"green ball"
					),
					new Ball(
						COLORS.get("yellowBall"),
						random(...xLimits),
						random(...yLimits),
						"yellow ball"
					),
					new Ball(
						COLORS.get("blueBall"),
						random(...xLimits),
						random(...yLimits),
						"blue ball"
					),
					new Ball(
						COLORS.get("purpleBall"),
						random(...xLimits),
						random(...yLimits),
						"purple ball"
					),
					new Ball(
						"black",
						random(...xLimits),
						random(...yLimits),
						"black ball"
					),
				];
				for (let i = 1; i <= 15; i++) {
					this.redBalls.push(
						new Ball(
							COLORS.get("redBall"),
							random(...xLimits),
							random(...yLimits),
							"red ball"
						)
					);
				}
				break;
			default:
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
						this.redBalls.push(
							new Ball(COLORS.get("redBall"), x, y, "red ball")
						);
					}
					startHeight -= BALL_DIAMETER / 2 + gap;
				}
				break;
		}
		this.balls.push(...colorBalls, ...this.redBalls);
	}
	draw() {
		for (const ball of this.balls) {
			ball.run();
		}
	}

	run() {
		this.draw();
	}
}

class Ball {
	constructor(color, x, y, label = "") {
		const options = {
			restitution: 1.1, // bounciness
			friction: 0.4,
			label,
			isSensor: true,
		};
		this.body = Bodies.circle(x, y, BALL_DIAMETER / 2, options);
		this.color = color;
		this.maxSpeed = 10;

		// Add object to the world
		Composite.add(engine.world, this.body);
	}

	draw() {
		push();
		fill(this.color);
		const pos = this.body.position;
		translate(pos.x, pos.y);
		circle(0, 0, BALL_DIAMETER);
		pop();
	}

	update() {
		if (Body.getSpeed(this.body) > this.maxSpeed) {
			Body.setSpeed(this.body, this.maxSpeed);
		}
	}

	run() {
		this.update();
		this.draw();
	}
}

class Cue {
	constructor() {
		this.position = createVector(width / 2, height - 400);

		const options = { isStatic: true };
		this.body = Bodies.rectangle(
			this.position.x,
			this.position.y,
			TABLE_WIDTH,
			5,
			options
		);

		Composite.add(engine.world, this.body);
	}

	run() {
		this.move();
		this.draw();
	}

	draw() {
		fill("#d5913b");
		rect(this.position.x, this.position.y, TABLE_WIDTH, 5);
	}

	move() {}
}
