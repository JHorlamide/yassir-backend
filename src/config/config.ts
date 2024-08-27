import dotenv from 'dotenv';
dotenv.config();

const config = {
  dbUrl: process.env.DB_URL as string,
  baseUrl: process.env.AIR_QUALITY_BASE_URL as string,
  apiKey: process.env.AIR_QUALITY_API_KEY as string,
  port: Number(process.env.PORT),
  prefix: "/api",
  node_env: process.env.NODE_ENV,
}

export default config;
