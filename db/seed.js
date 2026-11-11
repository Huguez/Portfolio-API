
const connectDB = require('./config')

const User = require('../models/User')
const Job = require("../models/Job")

const { Roles } = require('../constants/roles')
const { EMAIL } = require('../helpers/env-var')
const { FULLNAME, PASSWORD } = require('../helpers/env-var')
const { AboutMeData, CertificationsData, SkillsData, ExperiencesData } = require("./data")
const bcrytpjs = require("bcryptjs")

const salt = bcrytpjs.genSaltSync()


const seedAdmin = async () => {
   try {
      await connectDB(() => {});

      // ADMIN section
      const newUser = new User( { fullname: FULLNAME, email: EMAIL,role: Roles.ADMIN  } )
      newUser.password = bcrytpjs.hashSync( PASSWORD, salt )
      await newUser.save()
      
      // About me section
      const admin = await User.findOne( { email: EMAIL } )
      if( !admin ){
         throw new Error(`user Admin with email: ${EMAIL} not found!!!`)
      }

      const { description } = AboutMeData

      admin.description = description
      admin.certifications = [ ...CertificationsData ]
      admin.skills = [ ...SkillsData ]

      await admin.save();

      // Experiences section
      await Job.deleteMany({})

      await Job.insertMany([
         ...ExperiencesData
      ])

      process.exit(0);
   } catch (error) {
      console.error( error );
      process.exit(0);
   }  
}

seedAdmin()