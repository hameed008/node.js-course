const express = require('express');

// Storing all 'express' function in app variable.
const app = express();
const port = process.env.PORT || "3000";
const host = "localhost";

//* Routes
app.get('/', function (req, res) {
  res.send('Welcome to my hotel... How i can help you ?')
});

app.get('/chicken', function (req, res) {
  res.send('Sure sir, i would love to serve you chicken..')
});

app.get('/idle', function (req, res) {
  const idli = {
    name: 'rava idli',
    size: '10 cm diameter',
    is_samber: true,
    is_chutni: true
  }
  res.send(idli)
});

app.post('/person', function (req, res) {
  res.send('Data Saved Successfully');
})

//* Server
app.listen(port, host, function () {
  console.log(`Server is listening at http://${host}:${port}`)
})
