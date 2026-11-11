const { Router } = require("express")
const { check } = require("express-validator")
const { register, login } = require("../controllers/auth")
const validarCampos = require("../middleware/validarCampos")

const router = Router()

router.post( '/login', [
   check( "email", "E-mail is required" ).notEmpty(),
   check( "email", "Must be a e-mail valid" ).isEmail(),

   check( "password", "Password is required" ).not().isEmpty(),
   check( "password", "Password is too short" ).isLength( { min: 5 } ),
   check( "password", "Password must be has at least one number" ).matches( /^(?=.*\d)/ ),
   check( "password", "Password must be has at least one uppercase letter" ).matches (/^(?=.*[A-Z])/ ),
   check( "password", "Password must be has at least one especial character" ).matches( /^(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?])/ ),

   validarCampos
], login )

router.post( '/register',[
   check( "fullname", "Fullname is required" ).notEmpty(),
   check( "fullname", "Fullname is too short, must be at least 13 characters" ).isLength( { min: 13 } ),

   check( "email", "E-mail is required" ).notEmpty(),
   check( "email", "Must be a e-mail valid" ).isEmail(),

   check( "password", "Password is required" ).not().isEmpty(),
   check( "password", "Password is too short" ).isLength( { min: 5 } ),
   check( "password", "Password must be has at least one number" ).matches( /^(?=.*\d)/ ),
   check( "password", "Password must be has at least one uppercase letter" ).matches (/^(?=.*[A-Z])/ ),
   check( "password", "Password must be has at least one especial character" ).matches( /^(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?])/ ),

   validarCampos
], register )


module.exports = router