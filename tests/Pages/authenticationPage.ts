import { APIRequestContext, APIResponse } from '@playwright/test';
import { AuthHelper } from '../utils/authHelper';

export class AuthenticationPage {

    private authHelper: AuthHelper;

    constructor(request: APIRequestContext) {

        this.authHelper = new AuthHelper(request);

    }

    // Basic Authentication
    async basicAuth(url: string, username: string, password: string) {
        return await this.authHelper.basicAuth(url, username, password);
    }

    // Bearer Authentication
    async bearerAuth(url: string, token: string) {
        return await this.authHelper.bearerAuth(url, token);
    }

    // API Key Authentication
    async apiKeyAuth(url: string, key: string) {
        return await this.authHelper.apiKeyAuth(url, key);
    }

    // JWT Authentication
    async jwtLogin(url: string, username: string, password: string) {
        return await this.authHelper.jwtLogin(url, username, password);
    }

    // OAuth Authentication
    async oauthLogin(url: string, clientId: string, clientSecret: string) {
        return await this.authHelper.oauthLogin(url, clientId, clientSecret);
    }

    // Session Authentication
    async sessionLogin(baseURL: string, username: string, password: string) {
        return await this.authHelper.sessionLogin(baseURL, username, password);
    }

    // Create Booking
    async createBooking(baseURL: string, bookingData: object) {
        return await this.authHelper.createBooking(baseURL, bookingData);
    }

    // Update Booking
    async updateBooking(
        baseURL: string,
        bookingId: number,
        token: string,
        bookingData: object
    ) {
        return await this.authHelper.updateBooking(
            baseURL,
            bookingId,
            token,
            bookingData
        );
    }
}