const { request, responce } = require( "express" );
const { verify, TokenExpiredError } = require("jsonwebtoken")
const { SECRET_KEY_JWT } = require("../helpers/env-var")

const validateJWT = ( req = request, res = responce, next ) => {
   try {
      const auth = req.header( "Authorization" )
      const token = auth.split( ' ' )[1]
      console.log(token);
      if ( !token ) {
         return res.status( 401 ).json( {
            ok: false,
            msg: "There is not token in request"
         } )
      }

      const secret = SECRET_KEY_JWT

      const payload = verify( token, secret )

      req.uid = payload.uid

      return next()
   } catch (error) {
      console.log( error );

      if ( error instanceof TokenExpiredError ) {
         return res.status( 401 ).json( {
            ok: false,
            msg: "Token expired"
         } )
      }

      return res.status( 401 ).json( {
         ok: false,
         msg: "Token isn't valid"
      } )
      
   }
}

module.exports = validateJWT