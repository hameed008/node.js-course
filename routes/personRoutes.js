// * Node Js Routing with Express
const express = require('express');
const router = express.Router();
const Person = require('./../models/Person.js');
const { jwtAuthMiddleware, generateToken } = require('./../jwt')


//* Post route to add a person data to the database.
router.post("/signup", async (req, res) => {
  try {
    const personData = req.body;
    const newPerson = new Person(personData);

    // save the new person to the database using await.
    const savedPersonData = await newPerson.save();

    console.log("Person data Saved to the database");

    const payload = {
      id: savedPersonData.id,
      username: savedPersonData.username
    }

    // console.log(JSON.stringify(payload));

    const token = generateToken(payload)
    console.log('Token is :', token)

    res.status(201).json({ savedPersonData: savedPersonData, token: token });


  } catch (error) {
    console.error('Error while saving person data', error);
    res.status(501).json({ error: "Internal Server Error" });
  }
});

//* Profile Route:
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {

    const userData = req.user;
    console.log('User Data:', userData)

    // Extract user id from decoded token
    const userID = userData.id;

    // Find the user by id
    const user = await Person.findById(userID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // send user profile as JSON response
    res.status(201).json({ user })

  } catch (error) {
    console.error(error);
    res.status(501).json({ error: "Internal Server Error" });
  }
});

//* Login Route:
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await Person.findOne({ username: username });

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate Token
    const payload = {
      id: user.id,
      username: user.username
    }

    // Generate JWT token
    const token = generateToken(payload);

    // Return token as response 
    res.json({ token })
  } catch (error) {
    console.error(error);;
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//* Get route to get all person's data
router.get('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const allPersonData = await Person.find();
    console.log("All person's data fetched");
    res.status(201).json(allPersonData);

  } catch (error) {
    console.erorr("Error while fetching all person's data", error);
    res.status(501).json({ error: "Internal Server Error" });
  }
});

//* Parameterised API:
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType; // Extracr work type from URL Prameter: 
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({ job_profile: workType });
      console.log('Responsed Fetched');
      res.status(200).json(response);

    } else {
      res.status(404).json({ error: 'Invalid workType' });
    }
  } catch (error) {
    console.log("Error while fetching worktype data", error);
    res.status(501).json({ error: 'Internal server error' });
  }
})

//* Put route to update person's data
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    const updatedPersonData = req.body; // Extract person data that we want to update from the req.body

    // Returns the updated document
    const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // if we set 'new = true' then only it will Return the updated document else it will return the old document.
      runvalidators: true, // Run Mongoose validation
    })

    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");

    // Send the updated person data as a JSON response
    res.status(200).json({ message: "Data updeted successfully", updatedPerson });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//* Delete route to delete person's data
router.delete("/:id", async (req, res) => {
  try {
    const personld = req.params.id; // Extract the person's ID from the URL parameter 

    // Returns the deleted document
    const deletedPersonData = await Person.findByIdAndDelete(personld);
    console.log(deletedPersonData)

    if (!deletedPersonData) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data delete");;

    // Send the deleted person data as a JSON response
    res.status(200).json({ message: "person Deleted Successfully", deletedPersonData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;