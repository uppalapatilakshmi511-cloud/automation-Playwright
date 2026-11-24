
// import { test, expect } from '@playwright/test';

// test('OAuth 2.0 Authentication', async ({ request }) => {

//     // Step 1: Generate access token
//     const tokenResponse = await request.post(
//         'https://your-auth-server.com/token',
//         {
//             form: {
//                 grant_type: 'client_credentials',
//                 client_id: 'your_client_id',
//                 client_secret: 'your_client_secret'
//             }
//         }
//     );

//     expect(tokenResponse.status()).toBe(200);

//     const tokenBody = await tokenResponse.json();

//     expect(tokenBody.access_token).toBeTruthy();

//     // Step 2: Access protected API
//     const response = await request.get(
//         'https://your-api.com/protected',
//         {
//             headers: {
//                 Authorization: `Bearer ${tokenBody.access_token}`
//             }
//         }
//     );

//     expect(response.status()).toBe(200);

//     // Step 3: Negative scenario
//     const negativeResponse = await request.get(
//         'https://your-api.com/protected',
//         {
//             headers: {
//                 Authorization: 'Bearer invalid_token'
//             }
//         }
//     );

//     expect(negativeResponse.status()).toBe(401);
// });
