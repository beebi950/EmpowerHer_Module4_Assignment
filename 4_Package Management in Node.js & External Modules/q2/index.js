// Import the modules
const boxen = require("boxen");
const chalk = require("chalk");

// Define the message and title
const message = chalk.bgBlue.white("I am using my first external module!"); // Colored message
const title = "Hurray!!!";

// Box styles options
const classicOptions = {
  title: title,
  padding: 1,
  margin: 1,
};

const singleDoubleOptions = {
  title: title,
  borderStyle: "singleDouble", // Mixed single and double borders
  padding: 1,
  margin: 1,
};

const roundOptions = {
  title: title,
  borderStyle: "round", // Rounded corners
  padding: 1,
  margin: 1,
};

// Print message inside Classic box
console.log(boxen(message, classicOptions));

// Print message inside SingleDouble box
console.log(boxen(message, singleDoubleOptions));

// Print message inside Round box
console.log(boxen(message, roundOptions));
