const {Users,Notices}=require ('../utils/db')

const save=(data)=>{
    const users=new Users(data)
    return users.save()
}

const findone=(conditions)=>{
    return Users.findOne(conditions)
}

const find=(notices)=>{
    return Notices.find(notices)
}

const deleteOne=(conditions)=>{
    return Notices.deleteOne(conditions)
}

module.exports={
    save,
    findone,
    find,
    deleteOne
}