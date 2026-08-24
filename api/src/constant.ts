import dns from "node:dns";
import dotenv from "dotenv";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const envFileMap: Record<string, string> = {
    localdev: ".env.dev",
    dev: ".env.dev",
    prod: ".env.prod",
};

const mode = process.env.NODE_ENV ?? "localdev";

dotenv.config({ path: envFileMap[mode], override: true });

export const APP_CONSTANTS = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    PASETO_SECRET_KEY: process.env.PASETO_SECRET_KEY,
    PASETO_ADMIN_SECRET_KEY: process.env.PASETO_ADMIN_SECRET_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    ENV: process.env.ENV,
    REGION: process.env.REGION,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    BUCKET_NAME: process.env.BUCKET_NAME,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
}

console.log(APP_CONSTANTS, 'APP_CONSTANTS')