/**
 * CodeDNA
 * jobs.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 */

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getJobs,
  createJob,
  getJob,
  applyToJob,
  updatePortfolio,
  getPortfolio,
  endorseSkill
} = require('../controllers/jobController');

router.get('/', auth, getJobs);
router.post('/', auth, createJob);
router.get('/:id', auth, getJob);
router.post('/:id/apply', auth, applyToJob);

router.get('/portfolio/:id', auth, getPortfolio);
router.put('/portfolio', auth, updatePortfolio);
router.post('/portfolio/skill-endorse', auth, endorseSkill);

module.exports = router;
