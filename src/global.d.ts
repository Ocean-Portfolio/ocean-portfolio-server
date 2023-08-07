declare namespace NodeJS {
  interface ProcessEnv {
    DB_PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PW: string;
    DB_NAME: string;
    SERVER_PORT: number;
  }
}
