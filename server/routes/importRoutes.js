const express = require('express');
const router = express.Router();
const Property = require('../models/propertyModel');

//get all Properties 
router.get('/', async (req, res) => {
    try {
        //find() is a method of mongoose, if no parameter, return all
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;