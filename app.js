const express=require('express');
const https=require("https")
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({ extended: true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/index.html");
})

    app.post("/",(req,res)=>{
   
const query=req.body.cityName;
const unit="metric"

    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=3e6f242932e27b8d4dcf53bab5308938&units=metric"
https.get(url,function(response){
    response.on("data",function(data){
        if(response.statusCode==200){
       const weatherData=JSON.parse(data)
       const des=weatherData.weather[0].description
       const temp=weatherData.main.temp
       const icon=weatherData.weather[0].icon
       const imgicon="http://openweathermap.org/img/wn/" + icon + "@2x.png"
     
      res.write("<h1>the temprature in " + query + " is " + temp + " degrees celcius</h1>")
      res.write("<p>the temprature in "+ query + " is " + des + "</p>")
      res.write("<img src=" + imgicon +"></img>")
      res.send();
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
})
})
})
app.post("/failure",(req,res)=>{
    res.redirect("/")
})

app.listen(3000,()=>{
    console.log("Server is running at 3000 port.")
})
