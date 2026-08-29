import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'suraksha-net-demo-secret-key-change-in-production',
  jwtExpiry: process.env.JWT_EXPIRY || '24h',
};
