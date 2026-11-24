import { test, expect } from './Fixtures/baseFixtures';
import { authenticationData as data } from '../Test-data/authenticationData';

test.describe('API Authentication Testing', () => {

    // ---------------------------------
    // 1. BASIC AUTHENTICATION
    // ---------------------------------

    test('01 - Basic Auth - Positive', async ({ authenticationPage }) => {

        const response = await authenticationPage.basicAuth(
            data.basic.url,
            data.basic.username,
            data.basic.password
        );

        console.log('Basic Auth Status:', response.status());

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.authenticated).toBe(true);
        expect(responseBody.user).toBe(data.basic.username);

    });

    test('02 - Basic Auth - Negative', async ({ authenticationPage }) => {

        const response = await authenticationPage.basicAuth(
            data.basic.url,
            'wronguser',
            'wrongpassword'
        );

        console.log('Basic Auth Negative Status:', response.status());

        expect(response.status()).toBe(401);

    });


    // ---------------------------------
    // 2. BEARER TOKEN AUTHENTICATION
    // ---------------------------------

    test('03 - Bearer Token - Positive', async ({ authenticationPage }) => {

        const response = await authenticationPage.bearerAuth(
            data.bearer.url,
            data.bearer.token
        );

        console.log('Bearer Auth Status:', response.status());

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.authenticated).toBe(true);
        expect(responseBody.token).toBe(data.bearer.token);

    });

    test('04 - Bearer Token - Negative', async ({ authenticationPage }) => {

        // No Authorization header is sent
        const response = await authenticationPage['bearerAuth'](
            data.bearer.url,
            ''
        );

        console.log('Bearer Negative Status:', response.status());

        // httpbin should reject a missing bearer token
        expect(response.status()).toBe(401);

    });


    // ---------------------------------
    // 3. API KEY AUTHENTICATION
    // ---------------------------------

    test('05 - API Key - Positive', async ({ authenticationPage }) => {

        test.skip(
            !data.apiKey.url || !data.apiKey.key,
            'Configure API_KEY_URL and API_KEY in .env'
        );

        const response = await authenticationPage.apiKeyAuth(
            data.apiKey.url,
            data.apiKey.key
        );

        console.log('API Key Status:', response.status());

        expect(response.status()).toBe(200);

    });

    test('06 - API Key - Negative', async ({ authenticationPage }) => {

        test.skip(
            !data.apiKey.url || !data.apiKey.key,
            'Configure a real API Key endpoint before testing'
        );

        const response = await authenticationPage.apiKeyAuth(
            data.apiKey.url,
            'invalid_api_key'
        );

        console.log('API Key Negative Status:', response.status());

        expect(response.status()).toBe(401);

    });


    // ---------------------------------
    // 4. JWT AUTHENTICATION
    // ---------------------------------

    test('07 - JWT - Positive', async ({ authenticationPage }) => {

        test.skip(
            !data.jwt.loginUrl || !data.jwt.protectedUrl ||
            !data.jwt.username || !data.jwt.password,
            'Configure JWT details in .env'
        );

        const loginResponse = await authenticationPage.jwtLogin(
            data.jwt.loginUrl,
            data.jwt.username,
            data.jwt.password
        );

        console.log('JWT Login Status:', loginResponse.status());

        expect(loginResponse.status()).toBe(200);

        const loginBody = await loginResponse.json();

        expect(loginBody.token).toBeTruthy();

    });

    test('08 - JWT - Negative', async ({ authenticationPage }) => {

        test.skip(
            !data.jwt.loginUrl || !data.jwt.username || !data.jwt.password,
            'Configure JWT details in .env'
        );

        const response = await authenticationPage.jwtLogin(
            data.jwt.loginUrl,
            'wronguser',
            'wrongpassword'
        );

        console.log('JWT Negative Status:', response.status());

        expect([400, 401, 403]).toContain(response.status());

    });


    // ---------------------------------
    // 5. SESSION AUTHENTICATION
    // ---------------------------------

    test('09 - Session Auth - Positive', async ({ authenticationPage }) => {

        const response = await authenticationPage.sessionLogin(
            data.session.baseURL,
            data.session.username,
            data.session.password
        );

        console.log('Session Login Status:', response.status());

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.token).toBeTruthy();

    });

    test('10 - Session Auth - Negative', async ({ authenticationPage }) => {

        const response = await authenticationPage.sessionLogin(
            data.session.baseURL,
            'wronguser',
            'wrongpassword'
        );

        console.log('Session Negative Status:', response.status());

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.reason).toBe('Bad credentials');

    });


    // ---------------------------------
    // 6. SESSION AUTH - CREATE AND UPDATE
    // ---------------------------------

    test('11 - Session Auth - Create and Update Booking', async ({
        authenticationPage
    }) => {

        // Step 1: Login
        const loginResponse = await authenticationPage.sessionLogin(
            data.session.baseURL,
            data.session.username,
            data.session.password
        );

        expect(loginResponse.status()).toBe(200);

        const loginBody = await loginResponse.json();

        const token = loginBody.token;

        expect(token).toBeTruthy();

        console.log('Session Token Generated Successfully');


        // Step 2: Create Booking
        const bookingData = {

            firstname: 'Lakshmi',
            lastname: 'Tester',
            totalprice: 1500,
            depositpaid: true,

            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },

            additionalneeds: 'Breakfast'

        };

        const createResponse = await authenticationPage.createBooking(
            data.session.baseURL,
            bookingData
        );

        console.log('Create Booking Status:', createResponse.status());

        expect(createResponse.status()).toBe(200);

        const createBody = await createResponse.json();

        const bookingId = createBody.bookingid;

        expect(bookingId).toBeTruthy();

        console.log('Booking ID:', bookingId);


        // Step 3: Update Booking
        const updatedBookingData = {

            firstname: 'Lakshmi',
            lastname: 'Automation',
            totalprice: 2000,
            depositpaid: true,

            bookingdates: {
                checkin: '2026-12-01',
                checkout: '2026-12-05'
            },

            additionalneeds: 'Lunch'

        };

        const updateResponse = await authenticationPage.updateBooking(
            data.session.baseURL,
            bookingId,
            token,
            updatedBookingData
        );

        console.log('Update Booking Status:', updateResponse.status());

        expect(updateResponse.status()).toBe(200);

        const updateBody = await updateResponse.json();

        expect(updateBody.firstname).toBe('Lakshmi');
        expect(updateBody.lastname).toBe('Automation');

        console.log('Booking Updated Successfully');

    });


    // ---------------------------------
    // 7. OAUTH 2.0 AUTHENTICATION
    // ---------------------------------

    test('12 - OAuth - Positive', async ({ authenticationPage }) => {

        test.skip(
            !data.oauth.tokenUrl ||
            !data.oauth.clientId ||
            !data.oauth.clientSecret,
            'Configure OAuth details in .env'
        );

        const response = await authenticationPage.oauthLogin(
            data.oauth.tokenUrl,
            data.oauth.clientId,
            data.oauth.clientSecret
        );

        console.log('OAuth Status:', response.status());

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.access_token).toBeTruthy();

    });

    test('13 - OAuth - Negative', async ({ authenticationPage }) => {

        test.skip(
            !data.oauth.tokenUrl ||
            !data.oauth.clientId ||
            !data.oauth.clientSecret,
            'Configure OAuth details in .env'
        );

        const response = await authenticationPage.oauthLogin(
            data.oauth.tokenUrl,
            'invalid_client',
            'invalid_secret'
        );

        console.log('OAuth Negative Status:', response.status());

        expect([400, 401, 403]).toContain(response.status());

    });

});