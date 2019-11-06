var express = require('express');
var router = express.Router();

const { signup,username,signin,issigin,siginout }=require('../controllers/users')


/* GET users listing. */
router.post('/signup',username,signup)
router.post('/signin',signin)
router.get('/issigin',issigin)
router.get('/siginout',siginout)



module.exports = router;
