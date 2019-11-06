const usersModel=require('../models/users')
const tools=require('../utils/tools')

const authMiddleware=require('../middlewares/auth')

const signup=async function(req, res, next) {
    
    res.set('Content-Type', 'application/json; charset=utf-8')

    let {username,password}=req.body
    let hash=await tools.hash(password)

    let result=await usersModel.save({
      username,
      password:hash
    })
    console.log(result)
    if(result){
      res.render('success',{
        data:  JSON.stringify({
        message:'注册成功'
        })
      })
    }else{
      res.render('fail',{
        data:  JSON.stringify({
        message:'注册失败'
        })
      })
    }
    
}

const username=async function(req,res,next){
  res.set('Content-Type', 'application/json; charset=utf-8')
  let {username,password}=req.body

  let result=await usersModel.findone({username})
  if(result){
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名已经存在.'
      })
    })
  }else{
    next()
  }
}

const signin=async function(req,res,next){
  res.set('Content-Type', 'application/json; charset=utf-8')
  let {username,password}=req.body

  let result=await usersModel.findone({username})
  if(result){
    let passwordResult=await tools.compare(password, result.password)
    if(passwordResult){
      req.session.username=username

      res.render('success', {
        data: JSON.stringify({
          type: 'signin',
          username,
          message: '用户登录成功.'
        })
      })
    }else{
      res.render('fail', {
        data: JSON.stringify({
          type: 'signin',
          message: '用户名或密码不正确.'
        })
      })
    }
  }else{
    res.render('fail', {
      data: JSON.stringify({
        type: 'signin',
        message: '用户名或密码不正确.'
      })
    })
  }
}

// const find=async function(req,res,next){
//   res.set('Content-Type', 'application/json; charset=utf-8')
//   let result=await usersModel.find()
//   if(result){
//     res.send(result)
//   }
//   next()
// }


// const issigin=async function(req,res,next){
//   res.set('Content-Type', 'application/json; charset=utf-8')
//   if(req.session.username){
//     res.render('success', {
//       data: JSON.stringify({
//         username: req.session.username
//       })
//     })
//   }else{
//     res.render('fail', {
//       data: JSON.stringify({
//         message: '没有权限'
//       })
//     })
//   }
// }

const issigin=authMiddleware


const siginout=async function(req,res,next){
  res.set('Content-Type', 'application/json; charset=utf-8')
  req.session=null
  res.render('success', {
    data: JSON.stringify({
      message: '已注销'
    })
  })
}




// const deleteOne=async function(req,res,next){
//   console.log(req.body)
//   if(!req.body==={}){
//     console.log(4)
//     await usersModel.deleteOne(req.body)
//   }else{
//     return
//   }
// }   

module.exports= {
    signup,
    signin,
    username,
    issigin,
    siginout
}