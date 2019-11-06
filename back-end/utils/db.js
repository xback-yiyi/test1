const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/xback-admin', { useUnifiedTopology: true, useNewUrlParser: true })

const Users = mongoose.model('users', {
  username: String,
  password: String
})

const Notices=mongoose.model('notices',{
  username: String
})

module.exports = {
  Users,
  Notices
}