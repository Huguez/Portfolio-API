const { Schema, model } = require("mongoose")

const SkillSchema = Schema({
   name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
   }, 
   stars: {
      type: Schema.Types.Number,
      required: true,
   }
}, {
   timestamps: true,
   toJSON: {
      transform: (doc, ret) => {
        const {
          _id,
          __v,
          createdAt,
          updatedAt,
          ...obj
        } = ret;

        obj.id = _id.toString();

        return obj;
      },
   }
})

module.exports = model( "Skill", SkillSchema )