const express = require('express');

// Storing all 'express' function in app variable.
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // it will convert any type of data ( like: json data, form-data, urlencoded data ) coming from clients into javascript object and stores it in 'req.body' object.


const port = process.env.PORT || "3000";
const host = "localhost";

//* Routes
app.get('/', function (req, res) {
  res.send('Welcome to our hotel...')
});

app.get('/chicken', function (req, res) {
  // //   res.send('Sure sir, i would love to serve you chicken..')
  // // });

  // // app.get('/idle', function (req, res) {
  // //   const idli = {
  // //     name: 'rava idli',
  // //     size: '10 cm diameter',
  // //     is_samber: true,
  // //     is_chutni: true
  // //   }
  // //   res.send(idli)
  // // });

  // // app.post('/person', function (req, res) {
  // //   res.send('Data Saved Successfully');
})

// app.post('/person', (req, res) => {
//    const data = req.body; // Assuming the 'request body' contains the person data.

//   // Create a new Person document using the Mongoose model.
//   const newPerson = new Person(data);

//   // the below code is equivalent to const newPerson = new Person(data);
//   // newPerson.name = data.name;
//   // newPerson.age = data.age;
//   // newPerson.mobile = data.mobile;
//   // newPerson.email = data.email;
//   // newPerson.address = data.address;

//   // this save() method returns two things i): error and ii): saved data, person's data in this case. but now the save() does not support a callback function so we will use async await and try catch block.
//   //   newPerson.save((error, savedPerson) => {
//   //     if (error) {
//   //       console.log('Error while saving person data', error);
//   //       res.status(500).json({ error: 'Internal server error' });
//   //     } else {
//   //       console.log('Data saved successfully');
//   //       res.status(200).json(savedPerson)
//   //     }
//   //   })
//   })




//* Imporing routes file:
const personRoutes = require('./routes/personRoutes.js');
const menuItemsRoutes = require('./routes/menuItemsRoutes.js')

//* Using routers:
app.use('/person', personRoutes);
app.use('/menu', menuItemsRoutes)

//* Server
app.listen(port, host, function () {
  console.log(`Server is listening at http://${host}:${port}`)
})
