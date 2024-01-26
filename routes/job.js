const express = require('express')
const router = express.Router();

const {createJob , updateJob , getJobById , getAllJob , getBySearch , deleteOneJob} = require('../controllers/jobController');

const {isLoggedIn} = require('../middlewares/user');

router.route('/create').post(isLoggedIn , createJob);
router.route('/update/:id').put(isLoggedIn , updateJob);
router.route('/description/:id').get(getJobById);
router.route('/alljobs').get(getAllJob);
router.route('/searchquery').get(getBySearch);
router.route('/delete/:id').delete(deleteOneJob);

module.exports = router;