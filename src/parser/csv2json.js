const fs = require("fs");
const parser = require("csvtojson");
//
const inputFilePath = "./data/runkeeper.csv";
const outputFilePath = "./data/runkeeper.json";

const config = {
  noheader: false,
  headers: ["id", "dateTime", "type", "route", "distance",
    "duration", "pace", "speed", "calories", "climb",
    "heartRate", "friends", "notes", "gpx"]
};

parser(config)
  .fromFile(inputFilePath)
  .then((jsonObj) => {
    //console.log(jsonObj);
    // TODO perhaps add 'weekStart' or 'firstWeekDay' or just 'week'?
    fs.writeFileSync(outputFilePath, JSON.stringify(jsonObj));
  });

