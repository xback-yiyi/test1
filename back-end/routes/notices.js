var express=require('express')
var router=express.Router()

const {find,deleteOne}=require('../controllers/notices')

router.post('/find',find)
router.post('/delete',deleteOne)


module.exports= router