let dotenv = require('dotenv'); //어떤 OS에서 개발을 하더라도 동일하게 개발 할 수 있도록 환경변수를 등록하고 가져온다.
dotenv.config();
let express = require('express');
let app = express();
 
// console.log("Hello World");

app.get("/", function(req, res) {
  const filePath = __dirname + '/views/index.html'
  res.sendFile(filePath); //html file과 연결하는 법
  // res.send('hello world');
});

app.use('/public', express.static(__dirname + "/public")); // public folder가 html에 적용이 될 수 있게
app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

app.get("/json", function(req, res) {
 const data = {"message": "Hello json"}
 if (process.env.MESSAGE_STYLE === 'uppercase') {
  let response = {"message" : data.message.toUpperCase()}
  res.json(response)
 } else (
  res.json(data)
 )
 
})



module.exports = app;
