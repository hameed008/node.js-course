const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
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
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});

personSchema.pre('save', async function (next) {
  const person = this;
  // Hash the password only if it has been modified ( or is new );
  if (!person.isModified('password')) return next()
  try {

    // generating salt
    const salt = await bcrypt.genSalt(10);

    // generating hash password with the help of salt
    const hashPassword = await bcrypt.hash(person.password, salt);

    // override the plain password with the hashed one
    person.password = hashPassword;

    next();

  } catch (error) {
    return next(error)
  }
})

// Defining the comparePassword method
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use bcrypt to compare the provided password with the hashed password.
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error
  }
};

// prince -—> bdbebuebjebe7y38eh3jbeu3heb3
// login -—> agarwak
// bdbebuebjebe7y38eh3jbeu3heb3 ——> extract salt
// salt+agarwak -—> hash -—> svwsnwkmskwnswbshwvdhwjdnbejdne

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