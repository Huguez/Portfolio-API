const fs = require("fs")
const { upload, destroy } = require("./cloudinary")

const uploadCV = async (url, cv) => {
   try {
      if (url !== "") {
         const aux = url.split("/").pop()
         const public_id = aux.split(".")[0]
         const { result } = await destroy(`portfolio/aboutMe/${public_id}`)

         if (result !== 'ok') {
            throw new Error(`PDF don't found in path: portfolio/aboutMe/${public_id}`);
         }
      }

      const resume = cv[0]
      const bitmap = await fs.readFileSync(resume.path)
      const b64 = bitmap.toString('base64');

      const data = `data:${resume.mimetype};base64,${b64}`

      const resp = await upload(data, { folder: `portfolio/aboutMe/` })

      if (!resp.secure_url) {
         throw new Error("cloudinary failed");
      }

      fs.unlink(resume.path, (error) => {
         if (error) {
            throw error
         }
      })

      return resp.secure_url
   } catch (error) {
      console.log(error);
      throw new Error("Error - uploadCV helper");
   }
}

module.exports = {
   uploadCV
}