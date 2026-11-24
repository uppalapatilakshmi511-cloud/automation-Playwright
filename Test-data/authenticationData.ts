import dotenv from 'dotenv';
import path from 'path';

// Load .env before reading process.env
dotenv.config({
    path: path.resolve(process.cwd(), '.env')
});

export const authenticationData = {

    // Basic Authentication
    basic: {
        url: process.env.BASIC_AUTH_URL!,
        username: process.env.BASIC_USERNAME!,
        password: process.env.BASIC_PASSWORD!
    },

    // Bearer Token Authentication
    bearer: {
        url: process.env.BEARER_AUTH_URL!,
        token: process.env.BEARER_TOKEN!
    },

    // API Key Authentication
    apiKey: {
        url: process.env.API_KEY_URL || '',
        key: process.env.API_KEY || ''
    },

    // JWT Authentication
    jwt: {
        loginUrl: process.env.JWT_LOGIN_URL || '',
        protectedUrl: process.env.JWT_PROTECTED_URL || '',
        username: process.env.JWT_USERNAME || '',
        password: process.env.JWT_PASSWORD || ''
    },

    // Session Authentication
    session: {
        baseURL: process.env.SESSION_BASE_URL!,
        username: process.env.SESSION_USERNAME!,
        password: process.env.SESSION_PASSWORD!
    },

    // OAuth Authentication
    oauth: {
        tokenUrl: process.env.OAUTH_TOKEN_URL || '',
        protectedUrl: process.env.OAUTH_PROTECTED_URL || '',
        clientId: process.env.OAUTH_CLIENT_ID || '',
        clientSecret: process.env.OAUTH_CLIENT_SECRET || ''
    }
};