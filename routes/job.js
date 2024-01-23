const express = require('express')
const router = express.Router();

const {createJob , updateJob , getJobById} = require('../controllers/jobController');

const {isLoggedIn} = require('../middlewares/user');

router.route('/create').post(isLoggedIn , createJob);
router.route('/update/:id').put(isLoggedIn , updateJob);
router.route('/:id').get(getJobById);

module.exports = router;