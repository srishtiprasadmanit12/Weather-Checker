const { response } = require("express");
const express=require("express");
const http=require("https");
const bodyParser=require("body-parser");
const ejs = require("ejs");
const { rawListeners } = require("process");
const app=express()
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();
//getting error here
app.get("/",function(req,res){
    //res.sendFile(`${__dirname}/index.html`)
    res.render("input");
    
});
app.post("/",function(req,res){
   console.log() ;
   const query=req.body.CityName
   let apikey=process.env.API_KEY;
   const unit="metric";
  
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric"
    http.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const weatherDescription=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imageURL=" http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.render("display",{query:query,temp:temp,weatherDescription:weatherDescription,imageURL:imageURL})
        res.write("<h1> "+query+" temperature is "+temp+"</h1>");
        res.write("<p>the weather  is currently"+weatherDescription+"</p>")
        res.write("<img src="+imageURL+ ">")
        res.send();
        console.log(weatherData)
    })
})
})

app.listen(process.env.PORT||3000,function(){
    console.log("server is running on port 3000");
})
