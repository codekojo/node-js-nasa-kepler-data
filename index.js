const fs = require("fs");
const {parse} = require("csv-parse");

//Array for receiving the planet
let habitablePlanetResults = [];

/*
* Habitable Planet - we check whether that planet is habitable
*/
function isHabitablePlanet(planet){
  return planet["koi_disposition"] === "CONFIRMED" && (planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11)  && planet["koi_prad"] < 1.6;
}

/*
* we create a read stream on the csv.
* Inorder to use it we pipe it and then parse it
*/
fs.createReadStream('./kepler_data.csv').pipe(parse({
  comment: "#",
  columns: true,
})).on("data", (data) => {
        if(isHabitablePlanet(data)){
          habitablePlanetResults = [...habitablePlanetResults, data]
        }
}).on("error",(err) => {
  console.log("Error", err);
}).on("end", () => {
  console.log(habitablePlanetResults.length);
});
