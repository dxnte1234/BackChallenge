const { readFileAsync, writeFileAsync } = require('./fileSystem')

const createUser = async (user) => {
  try {
    const users = await readFileAsync()
    users.push(user)
    return writeFileAsync(users)
  } catch (error) {
    return null
  }
}
const getUsers = async () => {
  try {
    const users = await readFileAsync()
    return users
  } catch (error) {
    console.log(error)
    return null
  }
}
const updateUser = async (id, user) => {
  try {
    const users = await readFileAsync()
    const newList = users.map((u) => {
      if (u.id === id) u = user
      return u
    })
    return await writeFileAsync(newList)
  } catch (error) {
    return null
  }
}
const deleteUser = async (id) => {
  try {
    const users = await readFileAsync()
    const newList = users.map((u) => {
      if (u.id === id) u = {}
      return u
    })
    return await writeFileAsync(newList)
  } catch (error) {
    return null
  }
}
module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
}

const id = 12
const user = {
  id: 12,
  first_name: 'Dante',
  last_name: 'Sotelo',
  email: 'Dsotelo@mymail.com',
  gender: 'Male',
  password: 'dwiO12LOm\\'
}