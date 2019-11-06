const usersModel=require('../models/users')


const find=async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    let result=await usersModel.find()
    if(result){
        res.render('success', {
            data: JSON.stringify({
              list: result
            })
        })
    }
    
    next()
  }

const deleteOne=async function(req,res,next){
    console.log(req.body)
    if(req.body){
      console.log(4)
      await usersModel.deleteOne(req.body)
      find()
    }else{
      console.log(8)
    }
    res.send(req.body)
} 
   

module.exports={
    find,
    deleteOne
}