import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../config.env") });

interface ENV {
  DB_USERNAME: string | undefined;
  DB_PASSWORD: string | undefined;
  ISSUER: string | undefined;
  JWT_ACCESS_KEY: string;
  JWT_ACCESS_EXPIRY: number;
  JWT_REFRESH_KEY: string;
  JWT_REFRESH_EXPIRY: number;
  COOKIE_KEY: string;
}

const getConfig = (): ENV => {
  return {
    DB_USERNAME: process.env.DB_USERNAME ? process.env.DB_USERNAME : undefined,
    DB_PASSWORD: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : undefined,
    ISSUER: process.env.ISSUER ? process.env.ISSUER : undefined,
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY
      ? process.env.JWT_ACCESS_KEY
      : "secret-key-1",
    JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY
      ? Number(process.env.JWT_ACCESS_EXPIRY)
      : 17280000,
    JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY
      ? process.env.JWT_REFRESH_KEY
      : "secret-key-2",
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY
      ? Number(process.env.JWT_REFRESH_EXPIRY)
      : 3600000,
    COOKIE_KEY: process.env.COOKIE_KEY
      ? process.env.COOKIE_KEY
      : "secret-key-3",
  };
};

const config = getConfig();
export default config;
