
import { test, expect } from '@playwright/test';
import { authenticationData as data } from '../../Test-data/authenticationData';
import { AuthenticationPage } from '../Pages/authenticationPage';

test.describe('API Authentication Testing', () => {

    test('01 - Basic Auth - Positive', async ({ request }) => {

        const auth = new AuthenticationPage(request);

        const basicAuthHeader = Buffer.from(
            `${data.basic.username}:${data.basic.password}`
        ).toString('base64');
        const response = await request.get(data.basic.url, {
            headers: { Authorization: `Basic ${basicAuthHeader}` }
        });

        expect(response.status()).toBe(200);

        const responseData = await response.json();
        expect(responseData.authenticated).toBe(true);

        console.log('Basic Authentication Successful');
    });

    test('02 - Basic Auth - Negative', async ({ request }) => {

        const auth = new AuthenticationPage(request);

        const basicAuthHeader = Buffer.from('wrongUser:wrongPassword').toString('base64');
        const response = await request.get(data.basic.url, {
            headers: { Authorization: `Basic ${basicAuthHeader}` }
        });

        expect(response.status()).toBe(401);

        console.log('Basic Authentication Negative Scenario Passed');
    });


    // BEARER TOKEN

    test('03 - Bearer Token - Positive', async ({ request }) => {

        const response = await request.get(data.bearer.url, {
            headers: { Authorization: `Bearer ${data.bearer.token}` }
        });

        expect(response.status()).toBe(200);

        const responseData = await response.json();
        expect(responseData.authenticated).toBe(true);

        console.log('Bearer Authentication Successful');
    });

    test('04 - Bearer Token - Negative', async ({ request }) => {

        const response = await request.get(data.bearer.url);

        expect(response.status()).toBe(401);

        console.log('Bearer Negative Scenario Passed');
    });


    // API KEY

    test('05 - API Key - Positive', async ({ request }) => {

        test.skip(!data.apiKey.url || !data.apiKey.key,
            'Configure API_KEY_URL and API_KEY in .env');

        const response = await request.get(data.apiKey.url, {
            headers: { 'x-api-key': data.apiKey.key }
        });

        expect(response.status()).toBe(200);

        console.log('API Key Authentication Successful');
    });

    test('06 - API Key - Negative', async ({ request }) => {

        test.skip(!data.apiKey.url,
            'Configure API_KEY_URL in .env');

        const response = await request.get(data.apiKey.url, {
            headers: { 'x-api-key': 'invalid_api_key' }
        });

        expect(response.status()).toBe(401);

        console.log('API Key Negative Scenario Passed');
    });


    // JWT

    test('07 - JWT - Positive', async ({ request }) => {

        test.skip(
            !data.jwt.loginUrl || !data.jwt.protectedUrl ||
            !data.jwt.username || !data.jwt.password,
            'Configure JWT endpoints and credentials in .env'
        );

        const loginResponse = await request.post(data.jwt.loginUrl, {
            data: {
                username: data.jwt.username,
                password: data.jwt.password
            }
        });

        expect(loginResponse.status()).toBe(200);

        const loginData = await loginResponse.json();
        const token = loginData.accessToken;

        expect(token).toBeTruthy();

        const response = await request.get(data.jwt.protectedUrl, {
            headers: { Authorization: `Bearer ${token}` }
        });

        expect(response.status()).toBe(200);

        console.log('JWT Authentication Successful');
    });

    test('08 - JWT - Negative', async ({ request }) => {

        test.skip(!data.jwt.protectedUrl,
            'Configure JWT_PROTECTED_URL in .env');

        const response = await request.get(data.jwt.protectedUrl, {
            headers: { Authorization: 'Bearer invalid_jwt_token' }
        });

        expect(response.status()).toBe(401);

        console.log('JWT Negative Scenario Passed');
    });


    // SESSION AUTHENTICATION

    test('09 - Session Auth - Positive', async ({ request }) => {

        // Login
        const loginResponse = await request.post(`${data.session.baseURL}/auth`, {
            data: {
                username: data.session.username,
                password: data.session.password
            }
        });

        expect(loginResponse.status()).toBe(200);

        const loginData = await loginResponse.json();
        const sessionToken = loginData.token;

        expect(sessionToken).toBeTruthy();

        // Create booking
        const bookingResponse = await request.post(
            `${data.session.baseURL}/booking`,
            {
                data: {
                    firstname: 'Lakshmi',
                    lastname: 'Tester',
                    totalprice: 500,
                    depositpaid: true,
                    bookingdates: {
                        checkin: '2026-11-20',
                        checkout: '2026-11-25'
                    },
                    additionalneeds: 'Breakfast'
                }
            }
        );

        expect(bookingResponse.status()).toBe(200);

        const bookingData = await bookingResponse.json();

        // Update booking using session cookie
        const updateResponse = await request.put(
            `${data.session.baseURL}/booking/${bookingData.bookingid}`,
            {
                headers: {
                    Cookie: `token=${sessionToken}`,
                    Accept: 'application/json'
                },
                data: {
                    firstname: 'Lakshmi',
                    lastname: 'Automation',
                    totalprice: 700,
                    depositpaid: true,
                    bookingdates: {
                        checkin: '2026-11-20',
                        checkout: '2026-11-25'
                    },
                    additionalneeds: 'Lunch'
                }
            }
        );

        expect(updateResponse.status()).toBe(200);

        console.log('Session Authentication Successful');
    });

    test('10 - Session Auth - Negative', async ({ request }) => {

        const response = await request.post(
            `${data.session.baseURL}/auth`,
            {
                data: {
                    username: 'wrongUser',
                    password: 'wrongPassword'
                }
            }
        );

        expect(response.status()).toBe(200);

        const responseData = await response.json();

        expect(responseData.reason).toBe('Bad credentials');

        console.log('Invalid Session Login Rejected');
    });


    // OAUTH 2.0

    test('11 - OAuth - Positive', async ({ request }) => {

        test.skip(
            !data.oauth.tokenUrl || !data.oauth.protectedUrl ||
            !data.oauth.clientId || !data.oauth.clientSecret,
            'Configure OAuth credentials and endpoints in .env'
        );

        const tokenResponse = await request.post(data.oauth.tokenUrl, {
            form: {
                grant_type: 'client_credentials',
                client_id: data.oauth.clientId,
                client_secret: data.oauth.clientSecret
            }
        });

        expect(tokenResponse.status()).toBe(200);

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        expect(accessToken).toBeTruthy();

        const response = await request.get(data.oauth.protectedUrl, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        expect(response.status()).toBe(200);

        console.log('OAuth Authentication Successful');
    });

    test('12 - OAuth - Negative', async ({ request }) => {

        test.skip(!data.oauth.protectedUrl,
            'Configure OAUTH_PROTECTED_URL in .env');

        const response = await request.get(data.oauth.protectedUrl, {
            headers: { Authorization: 'Bearer invalid_oauth_token' }
        });

        expect(response.status()).toBe(401);

        console.log('OAuth Negative Scenario Passed');
    });

});
