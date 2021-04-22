const connection = require('../../database/connection')
const crypto = require('crypto')
const { wipe } = require('../UserController')

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
    const {token} = req.params
    try{
      const showUserSession = await connection('session').select('*').where({token: token})
      return res.json(showUserSession)
    }
    catch(err){
      return res.json({message:"ocorreu um erro inesperado",...err})
    }
  },

  async delete(req, res){
    const { token } = req.params
    try{
      const verifyUserByToken = await connection('session').where('token', token).select('*')
      if(verifyUserByToken.length !== 0){
        const showUserSession = await connection('session').where({token: token}).delete('*')
        return res.json({message: `Usuario deslogado com sucesso`})
      }
      else{
        return res.json({message: `token invalido`})
      }
    }
    catch(err){
      return res.json({message:"ocorreu um erro inesperado", ...err})
    }
  },

  async wipe(req,res){
    try{
      const showUserSession = await connection('session').delete('*')
      return res.json({message: `Todos os usuarios foram deslogados do sistema`})
    }
    catch(err){
      return res.json({message:"ocorreu um erro inesperado", ...err})
    }
  }
}