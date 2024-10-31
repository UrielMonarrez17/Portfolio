const express = require("express");
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const API_KEY = "3a341802b003880922fb704dd1fa59d8";
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/weather', (req, res) => {
  const city = req.body.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  console.log("city:",city);
  console.log("key:",API_KEY);
  https.get(url, (response) => {
      if (response.statusCode === 200) {
          let data = '';
          response.on('data', (chunk) => {
              data += chunk;
          });

          response.on('end', () => {
              const weatherData = JSON.parse(data);
              console.log("weath:",weatherData);
              const temp = weatherData.main.temp;
              const description = weatherData.weather[0].description;
              const icon = weatherData.weather[0].icon;
              const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

              // Renderiza la plantilla weather.ejs con los datos
              res.render('weather', {
                  city: city,
                  temperature: temp,
                  description: description,
                  imageUrl: imageUrl
              });
          });
      } else {
          res.status(response.statusCode).render('error', { error: { message: `City not found` } });
      }
  }).on('error', (e) => {
      res.status(500).render('error', { error: e });
  });
});

app.use((err, req, res, next) => {
  res.status(500).render('error', { error: err });
});



app.listen(3000, () => {
  console.log("Listening to port 3000");
});
