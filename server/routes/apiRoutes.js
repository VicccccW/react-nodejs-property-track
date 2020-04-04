const express = require('express');
const router = express.Router();

const testRoutes = require('./testRoutes');
const authRoutes = require('./authRoutes');
const backupRoutes = require('./backupRoutes');
const importRoutes = require('./importRoutes');

router.use('/test', testRoutes);
router.use('/auth', authRoutes);
router.use('/backup', backupRoutes);
router.use('/import', importRoutes);

module.exports = router;