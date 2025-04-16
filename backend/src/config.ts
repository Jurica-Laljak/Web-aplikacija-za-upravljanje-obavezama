import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../config.env") });

interface ENV {
  JWT_KEY: string;
  JWT_EXPIRY: number | undefined;
}

const getConfig = (): ENV => {
  return {
    JWT_KEY: process.env.JWT_KEY,
    JWT_EXPIRY: process.env.JWT_EXPIRY
      ? Number(process.env.JWT_EXPIRY)
      : undefined,
  };
};

const config = getConfig();
export default config;
