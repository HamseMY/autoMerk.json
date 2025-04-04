import * as fs from 'fs';
import * as readline from 'readline-sync';
import { Car } from '../interface';

const cars: Car[] = JSON.parse(fs.readFileSync('cars.json', 'utf-8'));

function displayMenu() {
  console.log("\nWelcome to the AutoMerk data viewer!");
  console.log("1. View all data");
  console.log("2. Filter by ID");
  console.log("3. Exit");
  
  const choice = readline.question("Please enter your choice: ");
  
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
  cars.forEach(car => {
    console.log(`- ${car.name} (${car.id})`);
  });
  displayMenu();
}

function filterById() {
  const idInput = readline.question("Please enter the ID you want to filter by: ");
  const id = parseInt(idInput);
  
  if (isNaN(id)) {
    console.log("Invalid ID format. Please enter a number.");
    filterById();
    return;
  }

  const car = cars.find(c => c.id === id);
  
  if (car) {
    console.log(`\n- ${car.name} (${car.id})`);
    console.log(`  - Description: ${car.description}`);
    console.log(`  - Age: ${car.age}`);
    console.log(`  - Active: ${car.isActive}`);
    console.log(`  - Manufacture Date: ${car.manufactureDate}`);
    console.log(`  - Image: ${car.imageUrl}`);
    console.log(`  - Fuel Type: ${car.fuelType}`);
    console.log(`  - Features: ${car.features?.join(', ') || 'None'}`);
    console.log(`  - Manufacturer: ${car.manufacturer.name}`);
    console.log(`    - Name: ${car.manufacturer.name}`);
    console.log(`    - Public: ${car.manufacturer.isPublic}`);
    console.log(`    - Founded: ${car.manufacturer.foundedYear}`);
    console.log(`    - Logo: ${car.manufacturer.logoUrl}`);
  } else {
    console.log("No car found with the given ID.");
  }
  
  displayMenu();
}

displayMenu();