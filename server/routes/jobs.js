const express = require('express');
const router = express.Router();
const { protect, authorizeAdmin, protectAdmin } = require('../middlewares/AdminAuth');
const {
  getJobs,
  getJobById,
  createJob,
  applyForJob,
  updateJob,
  deleteJob,
  makeInquiry,
} = require('../controllers/jobsController');

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', protectAdmin, authorizeAdmin('MainAdmin','SalesAdmin', 'AgentAdmin'), createJob);
router.post('/:id/apply', protect, applyForJob);
router.post('/:id/inquiry', makeInquiry);

// ✅ Add these two:
router.put('/:id', protectAdmin, authorizeAdmin('MainAdmin','SalesAdmin', 'AgentAdmin'), updateJob);
router.delete('/:id', protectAdmin, authorizeAdmin('MainAdmin','SalesAdmin', 'AgentAdmin'), deleteJob);

module.exports = router;
