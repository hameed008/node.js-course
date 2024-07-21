const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  job_profile: {
    type: String,
    enum: ['chef', 'waiter', 'manager'],
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  salary: {
    type: Number,
    required: true
  }
});

//* Create Person model:
const Person = mongoose.model('person', personSchema);
module.exports = Person;


//* Important Note:
// 1: In MongoDB, collection names are automatically pluralized. When you define a model in Mongoose with the name 'person', Mongoose pluralizes it to 'people' when creating the collection.

// 2: To prevent this behavior and keep the collection name as 'person', you can specify the collection name explicitly in your schema definition.

//? Here's how you can do it:
// const personSchema = new mongoose.Schema({
//   // define your schema here
// }, { collection: 'person' });

// const Person = mongoose.model('person', personSchema);
// module.exports = Person;

// By adding { collection: 'person' } to your schema definition, you tell Mongoose to use the exact name 'person' for the collection instead of pluralizing it