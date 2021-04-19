const connection = require('../../database/connection')
const crypto = require('crypto')

module.exports = {
  async create(req, res) {
    const {
      username,
      password
    } = req.body

    try {
      const verifyUserAndGetId = await connection('users').where('username', username).andWhere('password', password).select('id')
      if (verifyUserAndGetId.length !== 0) {
        const verifyUserIdSession = await connection('session').where('user_id', verifyUserAndGetId[0].id).select('*')
        const token = crypto.randomBytes(6).toString('HEX')
        const timestamp = Math.floor(Date.now() / 1000)
        const verifyUserAndGetUsername = await connection('users').where('username', username).andWhere('password', password).select('username')
        if(verifyUserIdSession.length === 0){
          const createUserSession = await connection('session').insert({user_id: verifyUserAndGetId[0].id, token, timestamp})
          return res.json({message:`Nova sessão... Bem vindo ${verifyUserAndGetUsername[0].username}`,user_id: verifyUserAndGetId[0].id, token, timestamp})
        }
        else{
          const updateUserSession = await connection('session').update({user_id: verifyUserAndGetId[0].id, token, timestamp}).where("user_id", verifyUserAndGetId[0].id)
          return res.json({message:`Sessão Atualizada! Bem vindo ${verifyUserAndGetUsername[0].username}`,user_id: verifyUserAndGetId[0].id, token, timestamp})
        }
      }
      else{
        return res.json({message:"credenciais incorretas"})
      }

    }
    catch (err) {
      console.log('err :>> ', err);
    }
  },

  async index(req,res){
    try{
      const indexSessions = await connection('session').select('*')
      return res.json(indexSessions)
    }
    catch(err){
      return res.json({message:"ocorreu um erro inesperado",...err})
    }
  },

  async show(req,res){
    const {id} = req.params
    try{
      console.log(id);
      const showUserSession = await connection('session').select('*').where({user_id: id})
      return res.json(showUserSession)
    }
    catch(err){
      return res.json({message:"ocorreu um erro inesperado",...err})
    }
  }
}