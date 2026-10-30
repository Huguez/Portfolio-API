const { Schema, model } = require("mongoose")

const CertificationScheme = Schema( {
   imagen: {
      type: Schema.Types.String,
      required: false,
      default: "",
   },
   title: {
      type: Schema.Types.String,
      required: true,
      unique: true,
   },
   link: {
      type: Schema.Types.String,
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
} )


module.exports = model( "Certification", CertificationScheme )