const TABLE_LENGTH = 900;
const TABLE_WIDTH = TABLE_LENGTH / 2;
const BALL_DIAMETER = TABLE_WIDTH / 36;
const CUSHION_WIDTH = (3 / 4) * 1.5 * BALL_DIAMETER;
ZONE_D_LINE = window.innerWidth / 2 - TABLE_LENGTH / (2 * 1.7);

// Colors
const brown = "#502900";

const BALLS = {
	cue: {
		id: 0,
		color: "white",
		x: window.innerWidth / 2,
		y: 200,
	},
	orange: {
		id: 1,
		color: "orange",
		x: ZONE_D_LINE,
		y: window.innerHeight / 2,
	},
	green: {
		id: 2,
		color: "green",
		x: ZONE_D_LINE,
		y: window.innerHeight / 2 - TABLE_WIDTH / 6,
	},
	yellow: {
		id: 3,
		color: "yellow",
		x: ZONE_D_LINE,
		y: window.innerHeight / 2 + TABLE_WIDTH / 6,
	},
	blue: {
		id: 4,
		color: "blue",
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	},
	purple: {
		id: 5,
		color: "purple",
		x: window.innerWidth / 2 + TABLE_LENGTH / 4,
		y: window.innerHeight / 2,
	},
	black: {
		id: 6,
		color: "black",
		x: window.innerWidth / 2 + TABLE_LENGTH / 2 - TABLE_LENGTH / 8,
		y: window.innerHeight / 2,
	},
};
