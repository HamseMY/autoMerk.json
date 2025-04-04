const express = require('express');
const axios = require('axios');
const app = express();
const port = 5500;

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('home'); 
});

app.get('/cars', async (req, res) => {
  const cars = await Car.find(); 
  res.render('overview', { cars }); 
});

app.get('/about', (req, res) => {
  res.render('about');
});


app.get('/contact', (req, res) => {
  res.render('contact'); 
});
let carsData = [];


axios.get('https://raw.githubusercontent.com/HamseMY/autoMerken.json/refs/heads/main/cars.json')
  .then(response => {
    carsData = response.data;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


app.get('/', (req, res) => {
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

    if (req.query.year) {
    const yearFilter = parseInt(req.query.year);
    filteredCars = filteredCars.filter(car => car.year === yearFilter);
  }

  res.render('overview', { cars: filteredCars });
});

app.get('/detail/:id', (req, res) => {
  const car = carsData.find(c => c.id === parseInt(req.params.id));
  if (car) {
    res.render('detail', { car });
  } else {
    res.status(404).send('Car not found');
  }
});

app.listen(5500, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
