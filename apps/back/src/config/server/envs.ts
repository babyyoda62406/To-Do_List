import 'dotenv/config';
import * as joi from 'joi';


interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
  FIREBASE_PROYECT_ID: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_CLIENT_EMAIL: string;
}   

const envSchema = joi.object({
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),
  FIREBASE_PROYECT_ID: joi.string().required(),
  FIREBASE_PRIVATE_KEY: joi.string().required(),
  FIREBASE_CLIENT_EMAIL: joi.string().required(),
}).unknown();

const { error, value } = envSchema.validate(process.env);

if(error) {
  throw new Error(`Config validation error: ${error.message}`);
}


export const envVars: EnvVars = {
  PORT: value.PORT,   
  JWT_SECRET: value.JWT_SECRET,
  FIREBASE_PROYECT_ID: value.FIREBASE_PROYECT_ID,
  FIREBASE_PRIVATE_KEY: value.FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL: value.FIREBASE_CLIENT_EMAIL,
}


