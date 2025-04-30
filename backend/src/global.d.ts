namespace NodeJS {
  interface ProcessEnv {
    DB_USERNAME: string;
    DB_PASSWORD: string;
    ISSUER: string;
    JWT_ACCESS_KEY: string;
    JWT_ACCESS_EXPIRY: string;
    JWT_REFRESH_KEY: string;
    JWT_REFRESH_EXPIRY: string;
    COOKIE_KEY: string;
  }
}
