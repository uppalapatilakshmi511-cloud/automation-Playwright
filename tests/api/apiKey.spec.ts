
// import { test, expect } from '@playwright/test';
// test('API Key Authentication', async ({ request }) => {

//     // Positive scenario
//     const response = await request.get(
//         'https://your-api.com/protected',
//         {
//             headers: {
//                 'x-api-key': 'valid_api_key'
//             }
//         }
//     );

//     expect(response.status()).toBe(200);

//     // Negative scenario
//     const negativeResponse = await request.get(
//         'https://your-api.com/protected',
//         {
//             headers: {
//                 'x-api-key': 'invalid_api_key'
//             }
//         }
//     );

//     expect(negativeResponse.status()).toBe(401);
// });
