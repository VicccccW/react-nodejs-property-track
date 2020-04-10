const express = require('express');
const router = express.Router();
const { getAll } = require('../postgresDB/query');

router.get('/getAll', async (req, res) => {
  try {
    const result = await getAll();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;