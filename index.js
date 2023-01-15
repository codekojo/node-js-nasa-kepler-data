const fs = require("fs");
const {parse} = require("csv-parse");


let results = [];

fs.createReadStream('./kepler_data.csv').pipe(parse({
  comment: "#",
  columns: true,
  skip_empty_lines:true
})).on("data", (chunk) => {
    results.push = chunk;
}).on("error",(err) => {
  console.log("Error", err);
}).on("end", () => {
  console.log(results);
  console.log("Ended oo");
});
