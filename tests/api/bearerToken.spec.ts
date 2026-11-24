
// import { test, expect } from '@playwright/test';

// test('Bearer Token Authentication', async ({ request }) => {

//     // Positive scenario
//     const response = await request.get(
//         'https://your-api.com/protected',
//         {
//             headers: {
//                 Authorization: 'Bearer valid_token'
//             }
//         }
//     );

//     expect(response.status()).toBe(200);

//     // Negative scenario
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
