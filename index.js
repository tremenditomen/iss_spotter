// // index.js
const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");
const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const dateTime = new Date(pass["risetime"]);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duraton;

    console.log(`Next pass at ${dateTime.toString()} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});
