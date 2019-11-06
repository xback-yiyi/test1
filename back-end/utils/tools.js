const bcrypt=require('bcrypt')

const hash=(password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,function(err,hash){
                resolve (hash)
            })
        })
    })
   
}

const compare = (fromUser, fromDatabase) => {
    return new Promise((resolve) => {
      bcrypt.compare(fromUser, fromDatabase, (err, res) => {
        resolve(res)
      })
    })
  }

module.exports={
    hash,
    compare
}