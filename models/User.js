const { Schema, model } = require("mongoose")
const { Roles } = require("../constans/roles")

const UserSchema = Schema({
   username: {
      type: Schema.Types.String,
      required: true,
   },
   email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
   },
   password: {
      type: Schema.Types.String,
      required: true,
   },
   role: {
      type: Schema.Types.String,
      enum: [Roles.ADMIN, Roles.USER],
      default: Roles.USER,
      required: true,
   },
   description: {
      type: Schema.Types.String,
      required: false,
      default: "",
   },
   image: {
      type: Schema.Types.String,
      required: false,
      default: "",
   },
   CV: {
      type: Schema.Types.String,
      required: false,
      default: ""
   },
   certifications: [{
      type: Schema.Types.ObjectId,
      ref: 'Certification',
   }],
}, {
   timestamps: true
})

UserSchema.method("toJSON", function (doc, ret) {
   const { __v, _id, password, createdAt, updatedAt, role, ...obj } = this.toObject()
   return obj
})

module.exports = model("User", UserSchema)