const connection = require('../../database/connection')
const crypto = require('crypto')

module.exports = {
  async create(req,res){
    const {
      username,
      password
    } = req.body

    const id = crypto.randomBytes(4).toString('HEX')

    try{
      const respCreateUser = await connection('users').insert({id, username, password})
      return res.json({id, username, password})
    }
    catch(err){
      console.log(err)
    }
  }
}