/// Constants
// General constants
const COLORS = new Map([
	["brown", "#3f250d"],
	["green", "#4e8834"],
	["darkGreen", "#326018"],
	["gold", "goldenrod"],
	["greenBall", "#3fac00"],
	["orangeBall", "#fb6e00"],
	["yellowBall", "#f0e91e"],
	["redBall", "#cb2e19"],
	["blueBall", "#1c14d9"],
	["violetBall", "#b0608d"],
]);

// Table constants
const TABLE_LENGTH = 900;
const TABLE_WIDTH = TABLE_LENGTH / 2;
const TABLE_CUSHIONS = 20;
const D_ZONE_LINE_X = -(TABLE_LENGTH / 2 - TABLE_CUSHIONS - TABLE_LENGTH / 4.8);

// Ball constants
const BALL_DIAMETER = TABLE_WIDTH / 36;

let table;
let ballsArray;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background("lightblue");
	rectMode(CENTER);
	ellipseMode(CENTER);

	table = new Table();
	ballsArray = new BallsArray("randomAll");
}

function draw() {
	table.draw();
	ballsArray.draw();
}

class Table {
	constructor() {
		this.length = TABLE_LENGTH;
		this.width = TABLE_WIDTH;
		this.cushions = TABLE_CUSHIONS;
		this.cornerRadius = 10;
	}

	draw() {
		push();
		noStroke();
		translate(width / 2, height / 2);

		// Draw main block
		fill(COLORS.get("brown"));
		rect(0, 0, this.length, this.width, this.cornerRadius);

		// Draw cloth
		fill(COLORS.get("green"));
		rect(
			0,
			0,
			this.length - 2 * this.cushions,
			this.width - 2 * this.cushions
		);

		// Draw pockets
		fill(COLORS.get("gold"));
		const top = -this.width / 2 + this.cushions / 2,
			bottom = this.width / 2 - this.cushions / 2,
			right = this.width - this.cushions / 2,
			left = -this.width + this.cushions / 2;

		const pad = this.cushions / 2;

		const pockets = [
			// Top Center
			[[0, top], [0], [0, pad]],
			// Bottom Center
			[[0, bottom], [0], [0, -pad]],
			// Top Right
			[
				[right, top],
				[0, this.cornerRadius, 0, this.cornerRadius],
				[-pad, pad],
			],
			// Bottom Right
			[
				[right, bottom],
				[this.cornerRadius, 0, this.cornerRadius, 0],
				[-pad, -pad],
			],
			// Bottom Left
			[
				[left, bottom],
				[0, this.cornerRadius, 0, this.cornerRadius],
				[pad, -pad],
			],
			// Top Left
			[
				[left, top],
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
						-this.cushions / 4,
						this.cushions / 4,
						this.cushions * 1.5,
						this.cushions * 1.5,
						...corners
					);
					break;
				case 3:
					rect(
						-this.cushions / 4,
						-this.cushions / 4,
						this.cushions * 1.5,
						this.cushions * 1.5,
						...corners
					);
					break;
				case 4:
					rect(
						this.cushions / 4,
						-this.cushions / 4,
						this.cushions * 1.5,
						this.cushions * 1.5,
						...corners
					);
					break;
				case 5:
					rect(
						this.cushions / 4,
						this.cushions / 4,
						this.cushions * 1.5,
						this.cushions * 1.5,
						...corners
					);
					break;
				default:
					rect(0, 0, this.cushions * 1.5, this.cushions, ...corners);
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

		// Draw markings
		stroke("white");
		line(
			D_ZONE_LINE_X,
			this.width / 2 - this.cushions,
			D_ZONE_LINE_X,
			-this.width / 2 + this.cushions
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
}

class BallsArray {
	constructor(mode) {
		this.balls = [new Ball("white", D_ZONE_LINE_X * 1.2, 0)];
		let colorBalls = [
			new Ball(COLORS.get("orangeBall"), D_ZONE_LINE_X, 0),
			new Ball(COLORS.get("greenBall"), D_ZONE_LINE_X, -TABLE_WIDTH / 6),
			new Ball(COLORS.get("yellowBall"), D_ZONE_LINE_X, TABLE_WIDTH / 6),
			new Ball(COLORS.get("blueBall"), 0, 0),
			new Ball(COLORS.get("violetBall"), TABLE_LENGTH / 4, 0),
			new Ball("black", TABLE_LENGTH / 2 - TABLE_LENGTH / 8, 0),
		];
		let redBalls = [];

		const xLimits = [
			-TABLE_LENGTH / 2 + TABLE_CUSHIONS * 1.5,
			TABLE_LENGTH / 2 - TABLE_CUSHIONS * 1.5,
		];
		const yLimits = [
			-TABLE_WIDTH / 2 + TABLE_CUSHIONS * 1.5,
			TABLE_WIDTH / 2 - TABLE_CUSHIONS * 1.5,
		];

		switch (mode) {
			case "randomRed":
				for (let i = 1; i <= 15; i++) {
					redBalls.push(
						new Ball(
							COLORS.get("redBall"),
							random(...xLimits),
							random(...yLimits)
						)
					);
				}
				break;
			case "randomAll":
				colorBalls = [
					new Ball(
						COLORS.get("orangeBall"),
						random(...xLimits),
						random(...yLimits)
					),
					new Ball(
						COLORS.get("greenBall"),
						random(...xLimits),
						random(...yLimits)
					),
					new Ball(
						COLORS.get("yellowBall"),
						random(...xLimits),
						random(...yLimits)
					),
					new Ball(
						COLORS.get("blueBall"),
						random(...xLimits),
						random(...yLimits)
					),
					new Ball(
						COLORS.get("violetBall"),
						random(...xLimits),
						random(...yLimits)
					),
					new Ball("black", random(...xLimits), random(...yLimits)),
				];
				for (let i = 1; i <= 15; i++) {
					redBalls.push(
						new Ball(
							COLORS.get("redBall"),
							random(...xLimits),
							random(...yLimits)
						)
					);
				}
				break;
			default:
				for (let i = 1; i <= 5; i++) {
					redBalls.push(new Ball(COLORS.get("redBall")));
					/* for (let j = 0; j < i; j++) {
					} */
				}
				break;
		}
		this.balls.push(...colorBalls, ...redBalls);
	}
	draw() {
		for (const ball of this.balls) {
			ball.draw();
		}
	}
}

class Ball {
	constructor(color, x, y) {
		this.size = BALL_DIAMETER;
		this.color = color;
		this.position = new createVector(x, y);
		this.speed = new createVector(0, 0);
		this.acceleration = new createVector(0, 0);
		this.maxSpeed = 10;
	}
	draw() {
		push();
		translate(width / 2, height / 2);
		noStroke();
		fill(this.color);
		circle(this.position.x, this.position.y, BALL_DIAMETER, BALL_DIAMETER);
		pop();
	}
}
