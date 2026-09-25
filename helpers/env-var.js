require("dotenv").config()
const joi = require("joi")

const envSchema = joi.object({
   PORT: joi.number().required(),
   CONTAINER_NAME: joi.string().required(),
   MONGODB_PORT: joi.number().required(),
   CLOUD_API_KEY: joi.string().required(),
   SECRET_KEY_JWT: joi.string().required(),
   CLOUD_NAME: joi.string().required(),
   CLOUD_API_SECRET: joi.string().required(),
   CLOUDINARY_URL: joi.string().required(),
   DB_CNN: joi.string().required(),
   DATABASE: joi.string().required(),
   NODE_ENV: joi.string().required(),
   EMAIL: joi.string().email().required(),
}).unknown(true);

const { error, value } = envSchema.validate( process.env );

if ( error ) {
   throw new Error(`Config validation error: ${ error.message }`);
}

const envVars = value;

module.exports = {
   PORT: envVars.PORT,
   CONTAINER_NAME: envVars.CONTAINER_NAME,
   MONGODB_PORT: envVars.MONGODB_PORT,
   CLOUD_API_KEY: envVars.CLOUD_API_KEY,
   SECRET_KEY_JWT: envVars.SECRET_KEY_JWT,
   CLOUD_NAME: envVars.CLOUD_NAME,
   CLOUD_API_SECRET: envVars.CLOUD_API_SECRET,
   CLOUDINARY_URL: envVars.CLOUDINARY_URL,
   DB_CNN: envVars.DB_CNN,
   DATABASE: envVars.DATABASE,
   NODE_ENV: envVars.NODE_ENV,
   EMAIL: envVars.EMAIL
}