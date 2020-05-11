const fs = require("fs");

const distances = [];
const dateTimes = [];

const linePartsToRun = lineParts => {
  if (lineParts && lineParts[2] === "Running") {
    return {
      id: lineParts[0],
      dateTime: lineParts[1],
      distance: lineParts[4],
      duration: lineParts[5],
      pace: lineParts[6],
      notes: lineParts[12]
    }
  }
};

fs.readFile("./data.csv",function(err, data) {
  if (err) {
    console.log(err)
  } else {
    // console.log(data.toString());
    const lines = data.toString().split("\n");
    lines.map(line => {
      const lineParts = line.split(",")
      let run = linePartsToRun(lineParts);
      if(run) {
        if (!isNaN(parseFloat(run.distance))) {
          distances.push(run.distance);
          dateTimes.push(run.dateTime.substr(0, 10));
        }
      };
    });
    process.stdout.write(distances.join(","));
    process.stdout.write("\n----------------------\n");
    process.stdout.write(dateTimes.join('","'));
  }
});
