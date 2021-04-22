const connection = require('../../database/connection')
const crypto = require('crypto')

module.exports = {
  async update(req,res){
    const {
      token
    } = req.params
    try{
      const verifyUserByToken = await connection('session').where('token', token).select('*')
      if(verifyUserByToken.length !== 0){
        const timestamp = Math.floor(Date.now() / 1000)
        const updateTimestampByToken = await connection('session').where('token', token).update({ user_id: verifyUserByToken[0].user_id, token: verifyUserByToken[0].token, timestamp: timestamp })
        return res.json({ message: `Timestamp atualizado!`, user_id: verifyUserByToken[0].user_id, token: verifyUserByToken[0].token, timestamp: timestamp })
      }
      else{
        return res.json({message:"token invalido"})
      }
    }
    catch(err){

    }
  }
}