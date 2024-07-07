class Table {
	constructor() {
		this.cushions = ["top", "right", "bottom", "left"].map(
			(position) => new Cushion(position)
		);
		this.pockets = ["tl", "tc", "tr", "br", "bc", "bl"].map(
			(position) => new Pocket(position)
		);
	}

	draw() {
		push();
		fill("#326018");
		rect(width / 2, height / 2, TABLE_LENGTH, TABLE_WIDTH);
		pop();

		this.drawZoneD();
		this.cushions.forEach((cushion) => cushion.run());
		this.pockets.forEach((pocket) => pocket.run());
	}

	run() {
		this.draw();
	}

	drawZoneD() {
		push();
		stroke("white");
		strokeWeight(1);
		line(
			ZONE_D_LINE,
			height / 2 - TABLE_WIDTH / 2,
			ZONE_D_LINE,
			height / 2 + TABLE_WIDTH / 2
		);
		noFill();
		arc(
			ZONE_D_LINE,
			height / 2,
			TABLE_WIDTH / 3,
			TABLE_WIDTH / 3,
			90,
			270,
			CHORD
		);
		pop();
	}
}
