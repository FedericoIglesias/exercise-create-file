import { log } from "console";
import * as fs from "fs";

const readFile = () => {};

fs.readFile("countries.txt", "utf8", (error, data) => {
  if (error) {
    throw error;
  }
  
  let formatData = data.split("\n");
  let cleanData = [];

  formatData.forEach((element) => {
    cleanData.push(element.replaceAll(",", "").replaceAll("\r", ""));
  });

  let dataWhitDensity = [];
  let dataWhitError = [];

  cleanData.forEach((element) => {

    let density = 0;
    let area = "0";
    let population = "0";
    let index = 0;

    for (let i = element.length; i >= 0; i--) {
      if (element[i] === " " && area === "0") {
        area = element.slice(i);
        index = i;
      } else if (element[i] === " " && area !== "0" && population === "0") {
        population = element.slice(i, index);
        density = Math.floor(Number(population) / Number(area));
        if (Number.isNaN(density)) {
          dataWhitError.push(element + " Error in data entry");
        } else {
          dataWhitDensity.push({ density: density , element : element});
        }
      }
    }
  });
  // log(dataWhitDensity);
  // log(dataWhitError);

  const orderByDensity = dataWhitDensity.sort((a, b) => b.density - a.density)

  let ultimateDataCountry = [] 
  
  dataWhitDensity.forEach(element => {
    ultimateDataCountry.push(element.element + ' ' + element.density)

    log(ultimateDataCountry)
  })

  fs.createWriteStream('countries.csv')
  fs.appendFile('countries.csv', ultimateDataCountry.toString(), (error) => {if(error)throw error})
});
