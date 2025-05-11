"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline-sync");
var cars = JSON.parse(fs.readFileSync('cars.json', 'utf-8'));
function displayMenu() {
    console.log("\nWelcome to the AutoMerk data viewer!");
    console.log("1. View all data");
    console.log("2. Filter by ID");
    console.log("3. Exit");
    var choice = readline.question("Please enter your choice: ");
    switch (choice) {
        case '1':
            viewAllData();
            break;
        case '2':
            filterById();
            break;
        case '3':
            process.exit(0);
        default:
            console.log("Invalid choice. Please try again.");
            displayMenu();
    }
}
function viewAllData() {
    console.log("\nAll Data:");
    cars.forEach(function (car) {
        console.log("- ".concat(car.name, " (").concat(car.id, ")"));
    });
    displayMenu();
}
function filterById() {
    var _a;
    var idInput = readline.question("Please enter the ID you want to filter by: ");
    var id = parseInt(idInput);
    if (isNaN(id)) {
        console.log("Invalid ID format. Please enter a number.");
        filterById();
        return;
    }
    var car = cars.find(function (c) { return c.id === id; });
    if (car) {
        console.log("\n- ".concat(car.name, " (").concat(car.id, ")"));
        console.log("  - Description: ".concat(car.description));
        console.log("  - Age: ".concat(car.age));
        console.log("  - Active: ".concat(car.isActive));
        console.log("  - Manufacture Date: ".concat(car.manufactureDate));
        console.log("  - Image: ".concat(car.imageUrl));
        console.log("  - Fuel Type: ".concat(car.fuelType));
        console.log("  - Features: ".concat(((_a = car.features) === null || _a === void 0 ? void 0 : _a.join(', ')) || 'None'));
        console.log("  - Manufacturer: ".concat(car.manufacturer.name));
        console.log("    - Name: ".concat(car.manufacturer.name));
        console.log("    - Public: ".concat(car.manufacturer.isPublic));
        console.log("    - Founded: ".concat(car.manufacturer.foundedYear));
        console.log("    - Logo: ".concat(car.manufacturer.logoUrl));
    }
    else {
        console.log("No car found with the given ID.");
    }
    displayMenu();
}
displayMenu();
