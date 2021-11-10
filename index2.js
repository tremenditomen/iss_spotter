const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const dateTime = new Date(pass["risetime"]);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duraton;

    console.log(`Next pass at ${dateTime.toString()} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
