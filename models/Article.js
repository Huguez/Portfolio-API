const { Schema, model } = require("mongoose")

const ContentItemSchema = Schema( {
   type: {
      type: Schema.Types.String,
      enum: [ "text", "image", "code", "list", "subtitle" ],
      required: true,
   },
   content: {
      type: [ Schema.Types.String ],
      required: true,
   },
} )

const ArticleSchema = Schema( {
   title: {
      type: Schema.Types.String,
      required: true,
   },
   body: {
      type: [ ContentItemSchema ],
      required: true,
   }
}, {
   timestamps: true
} )

ArticleSchema.method( "toJSON", function( doc, ret ){
   const { __v, _id, ...obj } = this.toObject()
   obj.id = _id
   return obj
} )

module.exports = model( "Article", ArticleSchema ) 