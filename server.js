const express = require('express');

// Storing all 'express' function in app variable.
const app = express();
const db = require('./db');
const passport = require('./auth')
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // it will convert any type of data ( like: json data, form-data, urlencoded data ) coming from clients into javascript object and stores it in 'req.body' object.


const port = process.env.PORT || "3000";
const host = "localhost";

//* Middleware:
const logRequest = (req, res, next) => {
  // console.log(`${new Date().toISOString()} Request made to : ${req.originalUrl}`);
  next(); // move on next phase
}

// here the 'logRequest' Middleware will run only for home routes ( / ) routes.
//* Routes
// app.get('/', logRequest, function (req, res) {
//   res.send('Welcome to our hotel...')
// });

app.use(logRequest) // now the 'logRequest' Middleware will run for every routes.

//* Initailizing passport.js
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

//* Routes
app.get('/', function (req, res) {
  res.send('Welcome to our hotel...')
});



//* Imporing routes file:
const personRoutes = require('./routes/personRoutes.js');
const menuItemsRoutes = require('./routes/menuItemsRoutes.js');



//* Using routers:
app.use('/person', personRoutes);
app.use('/menu', menuItemsRoutes)

//* Server
app.listen(port, host, function () {
  console.log(`Server is listening at http://${host}:${port}`)
})
