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
/**
 * From left border of the table
 */
const D_ZONE_LINE_X = window.innerWidth / 2 - TABLE_LENGTH / (2 * 1.7);

// Ball constants
const BALL_DIAMETER = TABLE_WIDTH / 36;
