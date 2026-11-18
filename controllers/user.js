const fs = require("fs")
const https = require("https")
const { upload, destroy } = require("../helpers/cloudinary")
const { uploadCV } = require("../helpers/uploadCV")
const { EMAIL } = require("../helpers/env-var")
const User = require("../models/User")
const Certification = require("../models/Certification")
const Skill = require("../models/Skill")

const adminEmail = EMAIL

const getAboutMe = async (req = request, res = response) => {
   try {

      const admin = await User.findOne({ email: adminEmail })
         .populate("certifications", "imagen title link")
         .populate("skills", "name stars");

      if (!admin) {
         return res.status(404).json({
            ok: false,
            msg: "not ADMIN"
         })
      }

      return res.status(200).json({
         ok: true,
         admin,
      })
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         msg: "Error - getAboutMe controller",
      })
   }
}

const updateAboutMe = async (req = request, res = response) => {
   try {
      const uid = req.uid

      const { cv, photo } = req.files

      const { fullname, description, certifications, skills } = req.body

      const admin = await User.findById(uid)

      if (!admin) {
         return res.status(404).json({
            ok: false,
            msg: "not ADMIN"
         })
      }

      if (photo) {

         if (admin.image) {
            const aux = admin.image.split("/").pop()
            const public_id = aux.split(".")[0]
            const { result } = await destroy(`portfolio/aboutMe/${public_id}`)

            if (result !== 'ok') {
               return res.status(404).json({
                  ok: false,
                  msg: `Images don't found in path: portfolio/aboutMe/${public_id}`
               })
            }
         }

         const file = photo[0]

         const bitmap = await fs.readFileSync(file.path)
         const b64 = bitmap.toString('base64');

         const data = `data:${file.mimetype};base64,${b64}`

         const resp = await upload(data, { folder: `portfolio/aboutMe/` })

         if (!resp.secure_url) {
            return res.status(500).json({
               ok: false,
               msg: "cloudinary"
            })
         }

         const { path } = file
         fs.unlink(path, (error) => {
            if (error) {
               throw error
            }
         })

         admin.image = resp.secure_url
      }

      admin.fullname = fullname
      admin.description = description

      const certificationsProspectus = [...JSON.parse(certifications)]

      await Certification.deleteMany({})

      const certificationsPromises = certificationsProspectus.map(async (cer) => {
         const certification = new Certification(cer)
         await certification.save()
         return certification._id;
      })

      const realCertifications = await Promise.all(certificationsPromises)

      admin.certifications = [...realCertifications]

      const skillsProspectus = [...JSON.parse(skills)]

      await Skill.deleteMany({})

      const skillsPromises = skillsProspectus.map(async (s) => {
         const skill = new Skill(s)
         await skill.save()
         return skill._id;
      })

      const realSkills = await Promise.all(skillsPromises)

      admin.skills = [...realSkills]

      await admin.save()

      return res.status(200).json({
         ok: true,
         admin
      })
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         msg: "Error - updateUser controller",
      })
   }
}

const getResume = async (_ = request, res = response) => {
   try {
      const admin = await User.findOne({ email: adminEmail })

      if (!admin) {
         return res.status(404).json({
            ok: false,
            msg: "not ADMIN"
         })
      }

      const url = admin.CV

      if (!url) {
         return res.status(404).json({
            ok: false,
            msg: "not CV"
         })
      }

      https.get(url, function (file) {
         if (file.statusCode !== 200) {
            file.resume();
            return res.status(file.statusCode).send("Error downloading PDF");
         }

         res.set('Content-disposition', 'attachment; filename=' + encodeURI("Carlos_Huguez_Resume.pdf"));
         res.set('Content-Type', "application/pdf");

         file.pipe(res);
      }).on('error', function (err) {
         console.error(err);
         return res.status(500).send("Error downloading PDF");
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         msg: "Error - getResume controller",
      })
   }
}

const updateResume = async (req = request, res = response) => {
   try {
      const uid = req.uid
      const { cv } = req.files

      const admin = await User.findById(uid)

      if (!admin) {
         return res.status(404).json({
            ok: false,
            msg: "not ADMIN"
         })
      }

      admin.CV = await uploadCV(admin.CV, cv)

      await admin.save()      

      return res.status(200).json({
         ok: true,
      })
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         msg: "Error - updateResume controller",
      })
   }
}

module.exports = {
   getAboutMe,
   updateAboutMe,
   getResume,
   updateResume
}