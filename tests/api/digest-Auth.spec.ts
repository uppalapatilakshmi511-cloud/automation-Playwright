
// import { test, expect, request as playwrightRequest } from '@playwright/test';

// test('Digest Authentication', async () => {

//     // Positive scenario
//     const apiContext = await playwrightRequest.newContext({
//         httpCredentials: {
//             username: 'admin',
//             password: 'password123'
//         }
//     });

//     const response = await apiContext.get(
//         'https://your-api.com/protected'
//     );

//     expect(response.status()).toBe(200);

//     await apiContext.dispose();

//     // Negative scenario
//     const invalidContext = await playwrightRequest.newContext({
//         httpCredentials: {
//             username: 'wronguser',
//             password: 'wrongpassword'
//         }
//     });

//     const negativeResponse = await invalidContext.get(
//         'https://your-api.com/protected'
//     );

//     expect(negativeResponse.status()).toBe(401);

//     await invalidContext.dispose();
// });
