const tableLength = 900;
const tableWidth = tableLength / 2;
const ballDiameter = 15;

let table;
const COLORS = new Map([
	["brown", "#3f250d"],
	["green", "#4e8834"],
	["darkGreen", "#326018"],
	["gold", "goldenrod"],
	["greenBall", "#23460e"],
	["orangeBall", "#af6a39"],
	["yellowBall", "#bbbe3a"],
	["redBall", "#cb2e19"],
	["blueBall", "#1c14d9"],
	["violetBall", "#b0608d"],
]);

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background("lightblue");
	rectMode(CENTER);

	table = new Table();
}

function draw() {
	table.draw();
}

class Table {
	constructor() {
		this.length = 900;
		this.width = this.length / 2;
		this.cushions = 20;
		this.cornerRadius = 10;
		this.lineMark = -(this.length / 2 - this.cushions - this.length / 4.8);
	}

	draw() {
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
			circle(holeMargin[0], holeMargin[1], ballDiameter * 1.5);
			pop();
		}

		// Draw markings
		stroke("white");
		line(
			this.lineMark,
			this.width / 2 - this.cushions,
			this.lineMark,
			-this.width / 2 + this.cushions
		);
		noFill();
		arc(
			this.lineMark,
			0,
			this.width / 3,
			this.width / 3,
			HALF_PI,
			-HALF_PI,
			CHORD
		);
	}
}
