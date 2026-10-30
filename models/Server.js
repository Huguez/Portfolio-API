const express = require("express")
const bodyParser = require('body-parser');
const cors = require("cors")
const path = require('path')
const connectDB = require("../db/config")
const { PORT } = require("../helpers/env-var")

const authRoute = require("../routes/auth")
const articleRoute = require("../routes/article")
const jobRoute = require("../routes/job")
const certificationRoute = require("../routes/certification")
const userRoute = require("../routes/user")

const notFound = require("../middleware/notFound")

class Server {

   constructor() {
      this.port = PORT;
      this.app = express()

      this.#middleware()

      this.#routes()
   }

   #middleware(){
      
      this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
      
      this.app.use( bodyParser.json() );
      
      this.app.use( bodyParser.urlencoded({ extended: true }) )

      this.app.use( cors() )
   }

   #routes(){
      this.app.use( "/api/auth", authRoute )

      this.app.use( "/api/articles", articleRoute )

      this.app.use( "/api/jobs", jobRoute )

      this.app.use( "/api/certifications", certificationRoute )

      this.app.use( "/api/user", userRoute )

      this.app.use( "/*", notFound )
   }


   start(){
      try {
         connectDB( () => {
            this.app.listen( this.port, () => console.log( `Server running on http://localhost:${ this.port }/` ) )
         } )
      } catch ( error ) {
         console.log( error );      
      }
   }
}

module.exports = Server 