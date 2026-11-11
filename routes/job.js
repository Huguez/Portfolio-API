const { Router } = require("express")
const { check, param } = require("express-validator")

const router = new Router()

const validateJWT = require("../middleware/validateJWT")
const validarCampos = require("../middleware/validarCampos")

const { createJob, getAllJobs, updateJob, deleteJob } = require("../controllers/job")

router.get( "/", getAllJobs )

router.use( validateJWT )

router.post( "/createJob", [
   check( "companyName", "name Company is required" ).trim().isString().notEmpty(),
   check( "startDate", "Start date is required" ).notEmpty(),
   check( "endDate", "End date is required" ).notEmpty(),
   check( "position", "position is required" ).trim().notEmpty(),
   check( "location", "location is required" ).trim().notEmpty(),
   check( "modeWork", "mode work is required" ).trim().notEmpty(),
   check( "description", "description is required" ).trim().notEmpty(),
   validarCampos
], createJob )

router.put( "/:id/updateJob", [
   check( "startDate", "Start date is required" ).trim().notEmpty(),
   check( "endDate", "End date is required" ).trim().notEmpty(),
   check( "position", "position is required" ).trim().notEmpty(),
   check( "location", "location is required" ).trim().notEmpty(),
   check( "modeWork", "mode work is required" ).trim().notEmpty(),
   check( "description", "description is required" ).trim().notEmpty(),
   validarCampos
], updateJob )

router.delete( "/:id/deleteJob", [
   param( "id", "the ID is invalid" ).isMongoId(),
   validarCampos
], deleteJob )

module.exports = router