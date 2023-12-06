declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_PORT: number;
    WEBSOCKET_PORT: number;
    DB_PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PW: string;
    DB_NAME: string;
    // STORAGE_PROJECT_ID: string;
    // STORAGE_KEY_FILENAME: string;
    R2_PUBLIC_HOST: string;
    R2_BUCKET_NAME: string;
    S3_ACCOUNT_ID: string;
    S3_ACCESS_KEY_ID: string;
    S3_SECRET_ACCESS_KEY: string;
    DISCORD_WEBHOOK_URL: string;
    NODE_ENV: 'development' | 'production';
  }
}
