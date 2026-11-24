
import { APIRequestContext, APIResponse } from '@playwright/test';

export class AuthHelper {

    constructor(private request: APIRequestContext) {}

    // Check whether URL is available
    private checkUrl(url: string | undefined): string {

        if (!url || url.trim() === '') {
            throw new Error(
                'API URL is missing. Please check the URL passed from authenticationPage.ts or your .env file.'
            );
        }

        return url.trim().replace(/\/+$/, '');
    }

    // 1. Basic Authentication
    async basicAuth(
        url: string | undefined,
        username: string,
        password: string
    ): Promise<APIResponse> {

        const apiUrl = this.checkUrl(url);

        return await this.request.get(apiUrl, {
            headers: {
                Authorization: 'Basic ' + Buffer.from(
                    `${username}:${password}`
                ).toString('base64')
            }
        });
    }

    // 2. Bearer Token Authentication
    async bearerAuth(
        url: string | undefined,
        token: string
    ): Promise<APIResponse> {

        const apiUrl = this.checkUrl(url);

        return await this.request.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // 3. API Key Authentication
    async apiKeyAuth(
        url: string | undefined,
        key: string
    ): Promise<APIResponse> {

        const apiUrl = this.checkUrl(url);

        return await this.request.get(apiUrl, {
            headers: {
                'x-api-key': key
            }
        });
    }

    // 4. JWT Login
    async jwtLogin(
        url: string | undefined,
        username: string,
        password: string
    ): Promise<APIResponse> {

        const apiUrl = this.checkUrl(url);

        return await this.request.post(apiUrl, {
            data: {
                username,
                password
            }
        });
    }

    // 5. OAuth Token Request
    async oauthLogin(
        url: string | undefined,
        clientId: string,
        clientSecret: string
    ): Promise<APIResponse> {

        const apiUrl = this.checkUrl(url);

        return await this.request.post(apiUrl, {
            form: {
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret
            }
        });
    }

    // 6. Session Login
    async sessionLogin(
        baseURL: string | undefined,
        username: string,
        password: string
    ): Promise<APIResponse> {

        const apiUrl = this.checkUrl(baseURL);

        return await this.request.post(`${apiUrl}/auth`, {
            data: {
                username,
                password
            }
        });
    }

    // 7. Create Booking
    async createBooking(
        baseURL: string | undefined,
        bookingData: object
    ): Promise<APIResponse> {

        const apiUrl = this.checkUrl(baseURL);

        return await this.request.post(`${apiUrl}/booking`, {
            data: bookingData
        });
    }

    // 8. Update Booking
    async updateBooking(
        baseURL: string | undefined,
        bookingId: number,
        token: string,
        bookingData: object
    ): Promise<APIResponse> {

        const apiUrl = this.checkUrl(baseURL);

        return await this.request.put(
            `${apiUrl}/booking/${bookingId}`,
            {
                headers: {
                    Cookie: `token=${token}`
                },
                data: bookingData
            }
        );
    }
}
