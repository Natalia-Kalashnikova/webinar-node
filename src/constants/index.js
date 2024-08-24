// **WEBINAR-CODE* 5-2

// export const ENV_VARS = {
//     PORT: 'PORT',
//     MONGODB_USER: 'MONGODB_USER',
//     MONGODB_PASSWORD: 'MONGODB_PASSWORD',
//     MONGODB_URL: 'MONGODB_URL',
//     MONGODB_DB: 'MONGODB_DB',
// };



// **WEBINAR-CODE* 6

import path from 'node:path';

export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
  JWT_SECRET: 'JWT_SECRET',
  FRONTEND_HOST: 'FRONTEND_HOST',
  BACKEND_HOST: 'BACKEND_HOST',
  CLOUDINARY_NAME: 'CLOUDINARY_NAME',
  CLOUDINARY_API_KEY: 'CLOUDINARY_API_KEY',
  CLOUDINARY_API_SECRET: 'CLOUDINARY_API_SECRET',
  IS_CLOUDINARY_ENABLED: 'IS_CLOUDINARY_ENABLED',
};

export const TEMPLATE_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'upload');
