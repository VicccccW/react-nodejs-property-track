const express = require('express');
const router = express.Router();

const testRoutes = require('./testRoutes');
const authRoutes = require('./authRoutes');
const mongoDBRoutes = require('./mongoDBRoutes');
const postgresRoutes = require('./postgresRoutes');

module.exports = (io) => {
  router.use('/test', testRoutes);
  router.use('/auth', authRoutes(io));
  router.use('/mongodb', mongoDBRoutes);
  router.use('/postgres', postgresRoutes);

  return router;
};