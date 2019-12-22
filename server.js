// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const timestampController=(req,res)=>{
  console.log("req.params ", req.params)

  let {date_string}=req.params;
  let date;
  const regexRes=/^[0-9]*$/.test(date_string.toString())
  console.log("regexRes ", regexRes)

  if(regexRes){
    date_string=parseInt(date_string,10)
    console.log("date_string ", date_string)
  }

  if(date_string==="void"){
    date=new Date()
  }else{
    date=new Date(date_string);
  }  
  
  
  if(date.toUTCString(date) === 'Invalid Date'){
    res.json({error:'Invalid Date'})
  }else{
    let unix=date.getTime() ///1000
  let result={unix, utc:date.toUTCString(date)}
  console.log("res",result)
  res.json(result)
  }
  
}


app.get("/api/timestamp/:date_string",timestampController)

app.get("/api/timestamp/",(req, res,next)=>{
  
if(req.params.hasOwnProperty('date_string')){
    console.log("req.params",req.params)

 next();

}else{
    let date_string=new Date()
    //Math.round((new Date()).getTime() / 1000)
  let timestamp=date_string.getTime()  //Math.round(date_string.getTime() / 1000)
      console.log("timestamp ", timestamp)
  req.params.date_string=timestamp
  next();
}
 
  
},timestampController)




// app.get("/api/timestamp/:date_string",(req, res)=>{
        
// })

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});