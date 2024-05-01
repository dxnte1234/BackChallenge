const mongoose = require('mongoose')
const URI = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@gen31js.ng7osxl.mongodb.net/${process.env.DATABASE}`;

const connect = new Promise(async (resolve, reject) => {
  const conn = mongoose.connect(URI)
  if (conn) resolve('Connection succesfully.')
  reject(new Error('Error connection failed'))
})

module.exports = {
  connect
}
