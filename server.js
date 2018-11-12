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


app.get("/api/timestamp/:date_string?", function (req, res) {
  var date = req.params.date_string;
  var test = new Date(date);
  var test2 = new Date(+date);
  var unix, utc;

  if (!isNaN(test.getTime())){
    console.log("first");
    unix = test.getTime();
    utc = test.toUTCString();
  } else if (!isNaN(test2.getTime())){
    console.log("second");
    var numDate = new Date(+date);
    unix = numDate.getTime();
    var newDate = new Date(unix * 1000);
    utc = newDate.toUTCString();
  } else {
    unix = test.getTime();
    utc = test.toUTCString();
  }

  res.json({
  "unix": unix,
  "utc": utc
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});