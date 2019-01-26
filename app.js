const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

const request = require('request');
const apiKey = '***************';

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})
app.post('/', function (req, res) {
  let city = req.body.city;
  let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid='+apiKey;

  request(url, function (err, response, body) {
    console.log('Post action has been started');
    console.log('URL: '+url);
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
      console.log('Error, please try again');
    } else {
      let weatherData = JSON.parse(body);
      if(weatherData.main == undefined){
        console.log('JSON body is null');
        let errorText = 'There is no city that name is ' + city;
        res.render('index', {weather: null, error: errorText});
      } else {
        console.log('JSON body is not null');
        res.render('index', {weather: 'It is '+ weatherData.main.temp + ' fahrenheit in '+weatherData.name, error: null});
      }
    }
    console.log('Post action has been finished');
  })
})

app.listen(3001, function () {
  console.log('App listening on port 3000!')
})