const boxen = require("boxen");

// Message & Title
const title = "Hurray!!!";
const message = "I am using my first external module!";
const fullMessage = `${title}\n${message}`;

//  Classic (Default Style)
const classicBox = boxen(fullMessage, {
  padding: 1,
  margin: 1,
  borderStyle: "classic",
});

//  SingleDouble Style
const singleDoubleBox = boxen(fullMessage, {
  padding: 1,
  margin: 1,
  borderStyle: "singleDouble",
});

//  Round Borders
const roundBox = boxen(fullMessage, {
  padding: 1,
  margin: 1,
  borderStyle: "round",
});

// Print All
console.log(classicBox);
console.log(singleDoubleBox);
console.log(roundBox);
