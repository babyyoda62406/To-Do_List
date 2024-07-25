import 'dotenv/config';
import * as joi from 'joi';


interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
}   

const envSchema = joi.object({
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),
}).unknown();

const { error, value } = envSchema.validate(process.env);

if(error) {
  throw new Error(`Config validation error: ${error.message}`);
}


export const envVars: EnvVars = {
  PORT: value.PORT,   
  JWT_SECRET: value.JWT_SECRET,
}


