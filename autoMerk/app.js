const express = require('express');
const axios = require('axios');
const app = express();
const port = 5500;

app.set('view engine', 'ejs');
app.use(express.static('public'));

let carsData = [];

axios.get('https://raw.githubusercontent.com/HamseMY/autoMerken.json/refs/heads/main/cars.json')
  .then(response => {
    carsData = response.data;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/cars', (req, res) => {
  let filteredCars = carsData;

  if (req.query.name) {
    const nameFilter = req.query.name.toLowerCase();
    filteredCars = filteredCars.filter(car => car.name.toLowerCase().includes(nameFilter));
  }

  if (req.query.brand) {
    const [field, order] = req.query.brand.split(':');
    filteredCars.brand((a, b) => {
      if (order === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
  }

  if (req.query.age) {
    const ageFilter = parseInt(req.query.age);
    filteredCars = filteredCars.filter(car => car.age === ageFilter);
  }

  res.render('cars', { cars: filteredCars });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/detail/:id', (req, res) => {
  const car = carsData.find(c => c.id === parseInt(req.params.id));
  if (car) {
    res.render('detail', { car });
  } else {
    res.status(404).send('Car niet gevonden');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
