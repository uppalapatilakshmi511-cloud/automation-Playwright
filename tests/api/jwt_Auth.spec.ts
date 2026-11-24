
// import { test, expect } from '@playwright/test';

// test('Token Authentication - Restful Booker', async ({ request }) => {

//     // Positive scenario - Generate token
//     const loginResponse = await request.post(
//         'https://restful-booker.herokuapp.com/auth',
//         {
//             data: {
//                 username: 'admin',
//                 password: 'password123'
//             }
//         }
//     );

//     expect(loginResponse.status()).toBe(200);

//     // Get token from response
//     const responseBody = await loginResponse.json();

//     const token = responseBody.token;

//     expect(token).toBeTruthy();

//     // Use token to access protected API
//     const response = await request.get(
//         'https://restful-booker.herokuapp.com/booking/1',
//         {
//             headers: {
//                 Cookie: `token=${token}`
//             }
//         }
//     );

//     expect(response.status()).toBe(200);

//     // Negative scenario - Invalid token
//     const negativeResponse = await request.put(
//         'https://restful-booker.herokuapp.com/booking/1',
//         {
//             headers: {
//                 Cookie: 'token=invalid_token',
//                 'Content-Type': 'application/json'
//             },
//             data: {
//                 firstname: 'Lakshmi',
//                 lastname: 'Tester',
//                 totalprice: 1500,
//                 depositpaid: true,
//                 bookingdates: {
//                     checkin: '2026-11-20',
//                     checkout: '2026-11-25'
//                 },
//                 additionalneeds: 'Breakfast'
//             }
//         }
//     );

//     expect(negativeResponse.status()).toBe(403);

// });
