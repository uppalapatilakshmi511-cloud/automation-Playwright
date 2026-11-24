
// import { test, expect } from '@playwright/test';

// test('Cookie Authentication', async ({ request }) => {

//     // Positive scenario
//     const response = await request.get(
//         'https://your-api.com/protected',
//         {
//             headers: {
//                 Cookie: 'sessionId=valid_session'
//             }
//         }
//     );

//     expect(response.status()).toBe(200);

//     // Negative scenario
//     const negativeResponse = await request.get(
//         'https://your-api.com/protected',
//         {
//             headers: {
//                 Cookie: 'sessionId=invalid_session'
//             }
//         }
//     );

//     expect(negativeResponse.status()).toBe(401);
// });
