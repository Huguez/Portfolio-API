const { sign, verify } = require("jsonwebtoken");
const { SECRET_KEY_JWT  } = require("./env-var")

const generateJWT = ( uid ) => {
   try {
      return new Promise( ( resolve, reject ) => {
         const payload = { uid }
         const secret = SECRET_KEY_JWT

         sign( payload, secret, { expiresIn: 60*60*48 }, ( err, token ) => {
            
            if ( err ) {
               console.log( err );
               reject( err )
            } else {
               resolve( token )
            }

         } )
      } )
   } catch ( error ) {
      console.log( error );
      throw new Error( "Error - generateJWT" )
   }
}

const checkIdByJWT = ( token = "" ) => {
   try {
      if ( token === "" ) {
         return null
      }

      const secret = SECRET_KEY_JWT

      const { uid } = verify( token, secret )

      return uid
   } catch ( error ) {
      console.log( error );
      return null;
   }
}

module.exports = {
   generateJWT,
   checkIdByJWT,
}