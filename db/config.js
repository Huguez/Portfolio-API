const { default: mongoose } = require("mongoose");
const { DB_CNN, DATABASE } = require("../helpers/env-var")

const cnn = DB_CNN
const database = DATABASE

const connectDB = ( callback ) => {
   try {
      mongoose.connect( `${ cnn }/${ database }`, {} ).then( () =>{
         console.log( "\nDB connected Successfully!!!");
         callback()
      } ).catch( error => {
         console.log( error  );
      } )
   } catch (error) {
      console.log( error );
      throw new Error("Database doesn't connected");
   }
}

module.exports = connectDB