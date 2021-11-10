/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  //https://api.ipify.org?format=jso

  request("https://api.ipify.org?format=json", (error, response, body) => {
    const ipAddress = JSON.parse(body);

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, ipAddress.ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const coordinates = {};
    coordinates["latitude"] = data["data"]["latitude"];
    coordinates["longitude"] = data["data"]["longitude"];
    callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords["latitude"]}&lon=${coords["longitude"]}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const result = JSON.parse(body);
      callback(null, result["response"]);
    }
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log("It worked! Returned IP:", ip);

    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log("it didn't work! ", error);
        return;
      }
      console.log("it worked! Returned coordinates: ", data);

      fetchISSFlyOverTimes(data, (error, result) => {
        if (error) {
          console.log("it didn't work! ", error);
          return;
        }
        console.log("it worked! Overhead pass predictions:  ", result);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
