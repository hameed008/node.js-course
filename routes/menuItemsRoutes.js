// * Node Js Routing with Express
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem.js');

// Post method to add menu's data to the database.
router.post('/', async (req, res) => {
  try {
    const menuData = req.body;
    const newMenuItem = new MenuItem(menuData);
    const savedMenuData = await newMenuItem.save();
    console.log('Menu data saved to the database');
    res.status(201).json(savedMenuData)
  } catch (error) {
    console.log('Error while saving menu items', error);
    res.status(501).json({ error: 'Internal server error' });
  }
});

// Get method to get all menu's data
router.get('/', async (req, res) => {
  try {
    const menuData = await MenuItem.find();
    console.log("All Menu's data fetched");
    res.status(201).json(menuData);
  } catch (error) {
    console.log("Error while fetching menu's data", error);
    res.status(501).json({ error: 'Internal server error' });
  }
});

module.exports = router;