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
      const respCreateUser = await connection('users').insert({id: id, username: username, password: password})
      return res.json({id, username, password})
    }
    catch(err){
      // console.log(err)
      if(err.code === "23505"){
        return res.json({message:"usuario "+username+" ja existente!", ...err})
      }
      return res.json({message:"ocorreu um erro inesperado", ...err})
    }
  },

  async update(req,res){
    const {
      username,
      password
    } = req.body

    const {id} = req.params

    try{
      console.log('id_update: ', id)
      const verifyUser = await connection('users').where('id', id).select('*')
      console.log('verifyUser: ',verifyUser)
      if(verifyUser.length !== 0){
        const respUpdateUser = await connection('users').where("id", id).update({id:id, username:username, password:password})
        return res.json({message:`usuario ${username} editado com sucesso`, id, username, password})
      }
      else{
        return res.json({message:`id invalido`})
      }
    }
    catch(err){
      if(err.code === "23505"){
        return res.json({message:"usuario "+username+" ja existente!", ...err})
      }
      return res.json({message: "ocorreu um erro inerperado", ...err})
    }
  },

  async index(req,res){
    try{
      const respIndexUsers = await connection('users').select('*')
      return res.json(respIndexUsers)
    }
    catch(err){
      return res.json({message:"ocorreu um erro inesperado", ...err})
    }
  },

  async show(req,res){
    const {id} = req.params
    try{
      console.log('id_show: ', id)
      const respShowUser = await connection('users').select('*').where({id: id})
      return res.json(respShowUser)
    }
    catch(err){
      return res.json({message:"ocorreu um erro inesperado", ...err})
    }
  },

  async wipe(req,res){
    try{
      const respWipeUsers = await connection('users').delete('*')
      return res.json({ message:"todos os usuarios deletados com sucesso", ...respWipeUsers })
    }
    catch(err){
      return res.json({message:"ocorreu um erro inesperado", ...err})
    }
  },

  async delete(req,res){
    const {id} = req.params
    try{
      console.log('id_delete: ', id)
      const verifyUser = await connection('users').where('id', id).select('*')
      console.log('verifyUser: ',verifyUser)
      if(verifyUser.length !== 0){
        const respDeleteUsers = await connection('users').delete('*').where('id', id)
        return res.json({message:"usuario deletado com sucesso!", ...respDeleteUsers})
      }
      else{
        return res.json({message: `id invalido`}) 
      }
    }
    catch(err){
      return res.json({message:"ocorreu um erro inesperado", ...err})
    }
  }
}