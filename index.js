// // index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);

//   fetchCoordsByIP(ip , (error,data) => {
//     if (error) {
//       console.log("it didn't work! ", error);
//       return;
//     }
//     console.log("it worked! Returned coordinates: ", data);



//     fetchISSFlyOverTimes(data, (error, result) => {
//       if (error) {
//         console.log("it didn't work! ", error);
//         return;
//       }
//       console.log("it worked! Overhead pass predictions:  ", result);
//     });

//   }

//   );
// });

const printPassTimes = function(passTimes) {
  for(const pass of passTimes) {
    const dateTime = new Date(pass['risetime'])
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duraton;
    
    console.log(`Next pass at ${dateTime.toString()} for ${duration} seconds!`);
  }
}


 nextISSTimesForMyLocation((error,passTimes) => {
  if(error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
})