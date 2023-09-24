declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_PORT: number;
    DB_PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PW: string;
    DB_NAME: string;
    STORAGE_PROJECT_ID: string;
    STORAGE_KEY_FILENAME: string;
    DISCORD_WEBHOOK_URL: string;
    NODE_ENV: 'development' | 'production';
  }
}
