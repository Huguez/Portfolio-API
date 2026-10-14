
const connectDB = require('./config')

const User = require('../models/User')
const { Roles } = require('../constants/roles')
const { EMAIL } = require('../helpers/env-var')

const seedAdmin = async () => {
   await connectDB(() => {});

   const result = await User.findOneAndUpdate(
      { email: EMAIL },
      { role: Roles.ADMIN },
      { new: true }
   )

   console.log(result ? `Admin: ${result.email}` : 'User not found');
   process.exit(0)
}

seedAdmin()