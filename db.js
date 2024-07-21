const mongoose = require('mongoose');

//* Define the MongoDB connection URL:
const mongoURL = 'mongodb://localhost:27017/hotels'; // if there is no database available in the database with the name 'hotels', then at the time of establishing connection it will be created.

//* Setup MongoDB Connection:
mongoose.connect(mongoURL,

  //? they are no longer needed after the lasted updated of mongoDB.
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // }
)

const db = mongoose.connection;

//* Define event listeners for database connection:
db.on('connected', () => {
  console.log('Connected to mongoDB Server');
});

db.on('error', () => {
  console.log('mongoDB Connection error', error);
});

db.on('disconnected', () => {
  console.log('mongoDB disconnected');
});

//* Export the database connection:
module.exports = db;