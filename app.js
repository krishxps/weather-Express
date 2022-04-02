const express = require('express');
const bodyparser = require('body-parser');
const https = require('https');
const app = express();
app.use(bodyparser.urlencoded({extended:true}));


app.get("/", function (req, res) {
   res.sendFile(__dirname + "/index.html")
  });


app.post("/", function(req, res){
    // res.send("done");
  const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=1e0b3788b1b120c47b8d2c0fa51920af&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);

     response.on("data", function (data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const iconUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
      res.write("<h1>The Weather is currently " + weatherDescription + "</h1>");
      res.write("<h3>Temprature in " + city + " is " + temp + "</h3>");
      res.write("<img src="+iconUrl+">");
      res.send();
  });
  });
});

app.listen(3000,function(){
    console.log("Listening To port 3000")
});