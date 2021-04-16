const connection = require('../../database/connection')
const crypto = require('crypto')
const { S_IFREG } = require('constants')

module.exports = {
  async create(req,res){
    const {
      username,
      password
    } = req.body

    const id = crypto.randomBytes(4).toString('HEX')

    try{
      const respCreateUser = await connection('users').insert({id: id, username: username, password: password})
      return res.json({id, username, password})
    }
    catch(err){
      // console.log(err)
      if(err.code === "23505"){
        return res.send({message:"usuario ja existente!", ...err})
      }
      return res.send({message:"ocorreu um erro inesperado", ...err})
    }
  }
}