/**
 * @file /api/v1/ routes
 */

const express = require('express');

const companyRoutes = require('./company');
const branchRoutes = require('./branch');
const searchRoutes = require('./search');
const exportRoutes = require('./export');
const importRoutes = require('./import');

const router = express.Router();

router.use('/company', companyRoutes);
router.use('/branch', branchRoutes);
router.use('/search', searchRoutes);
router.use('/export', exportRoutes);
router.use('/import', importRoutes);

module.exports = router;
