"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var fs = require("fs");
fs.readFile(".gitignore", "utf8", function (error, data) {
    if (error) {
        throw error;
    }
    var formatData = data.split("\n");
    var cleanData = [];
    formatData.forEach(function (element) {
        cleanData.push(element.replaceAll(",", "").replaceAll("\r", ""));
    });
    var dataWhitDensity = [];
    var dataWhitError = [];
    cleanData.forEach(function (element) {
        var density = 0;
        var area = "0";
        var population = "0";
        var index = 0;
        for (var i = element.length; i >= 0; i--) {
            if (element[i] === " " && area === "0") {
                area = element.slice(i);
                index = i;
            }
            else if (element[i] === " " && area !== "0" && population === "0") {
                population = element.slice(i, index);
                density = Math.floor(Number(population) / Number(area));
                if (Number.isNaN(density)) {
                    dataWhitError.push(element + " Error in data entry");
                }
                else {
                    dataWhitDensity.push({ density: density, element: element });
                }
            }
        }
    });
    // log(dataWhitDensity);
    // log(dataWhitError);
    var orderByDensity = dataWhitDensity.sort(function (a, b) { return b.density - a.density; });
    var ultimateDataCountry = ['Countries Population Area Density'];
    dataWhitDensity.forEach(function (element) {
        ultimateDataCountry.push(element.element + ' ' + element.density);
    });
    fs.createWriteStream('countries.csv');
    fs.appendFile('countries.csv', ultimateDataCountry.join('\n').replaceAll(' ', ','), function (error) { if (error)
        throw error; (0, console_1.log)('all ok'); });
});
