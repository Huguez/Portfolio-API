const { request, response } = require( "express" );
const bcrytpjs = require("bcryptjs")
const User = require("../models/User")
const { generateJWT } = require("../helpers/jwt")

const login = async ( req = request, res = response ) => {
   try {
      const { email, password } = req.body

      const user = await User.findOne( { email } )
      if( !user ){
         return res.status( 404 ).json( {
            ok: false,
            msg: `E-mail ${ email } is NOT registered`
         } )
      }

      const samePwd =  bcrytpjs.compareSync( password, user.password )
      if ( !samePwd ){
         return res.status( 400 ).json( {
            ok: false,
            msg: `Incorrect password`,
         } )
      }

      const token = await generateJWT( user._id.toString() )

      return res.status( 200 ).json( {
         ok: true,
         token,
         user
      } )
   } catch (error) {
      console.log( error );
      return res.status( 500 ).json( {
         ok: false,
         msg: "Error - login",
      } )
   }
}

module.exports = {
   login,
}