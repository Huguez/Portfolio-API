
const { Router } = require("express")
const { check, body } = require("express-validator")

const router = new Router()

const { v4: uuidv4 } = require("uuid")
const multer = require("multer")

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
   },
   filename: function (req, file, cb) {
      const uniqueID = uuidv4()
      const ext = file.originalname.split(".")[1]
      const newFileName = `${uniqueID}.${ext}`
      cb(null, newFileName)
   }
})

const upload = multer({ storage })

const { getAboutMe, updateAboutMe, getResume } = require("../controllers/user")
const validarCampos = require("../middleware/validarCampos")
const validarJWT = require("../middleware/validateJWT")

router.get("/aboutMe", getAboutMe)

router.get("/getResume", getResume)

router.put("/aboutMe", [
      upload.fields([{ name: 'photo', maxCount: 1 }, { name: "profile-image", maxCount: 1 }]),
      check("fullname", "Fullname is required")
         .isString()
         .notEmpty(),
      body("description", "Description is required")
         .isString()
         .notEmpty(),
      body("certifications.*")
         .isObject({ strict: true })
         .withMessage("Each certification must be an object"),
      body("certifications.*.image")
         .isString()
         .withMessage("image must be a string")
         .notEmpty()
         .withMessage("image is required"),
      body("certifications.*.title")
         .isString()
         .withMessage("title must be a string")
         .notEmpty()
         .withMessage("title is required"),
      body("certifications.*.link")
         .isString()
         .withMessage("link must be a string")
         .notEmpty()
         .withMessage("link is required"),
      body("skills.*")
         .isObject({ strict: true })
         .withMessage("Each certification must be an object"),
   ],
   validarJWT,
   validarCampos,
   updateAboutMe
);

module.exports = router