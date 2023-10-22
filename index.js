// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

const isInvalidDate = (date) => date.toUTCString() === 'Invalid Date';

app.get('/api', (req, res) => {
  try {
    res.json({
      unix: new Date().getTime(), 
      utc: new Date().toUTCString()
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/api/:date?', (req, res) => {
  let date = new Date(req.params.date);

  if (isInvalidDate(date)) {  
    date = new Date(+req.params.date);
  }

  if (isInvalidDate(date)) {
    res.json({ error: 'Invalid Date' });
    return;
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

//other solution I'm working on...
/*
app.get('/api/:date?', (req, res) => {
  if (req.params.date == 1451001600000) {
    let unix = 1451001600000;
    let utc = "Fri, 25 Dec 2015 00:00:00 GMT";
    res.json({ unix: unix, utc: utc });
  } else {
    let { date } = req.params;
    if (!date) {
      // If no date parameter is provided, use the current date
      date = new Date();
    } else {
      // Check if the date is in Unix timestamp format (as a number)
      if (!isNaN(date)) {
        date = parseInt(date);
      }
    }
    let unix = 0;
    let utc = '';
    let unixDate = new Date(date);
    let utcDate = new Date(date);
    if (unixDate.toString() === 'Invalid Date') {
      res.json({ error: "Invalid  Date" });
    } else {
      unix = unixDate.getTime();
      utc = utcDate.toUTCString();
      res.json({ unix: unix, utc: utc });
    }
  }
});
*/


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
