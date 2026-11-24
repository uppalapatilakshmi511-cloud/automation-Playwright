
// import { test, expect } from '@playwright/test';

// test.describe('Session Authentication', () => {

//     let sessionToken: string;

//     // Positive Scenario
//     test('Verify login with valid credentials', async ({ request }) => {

//         const response = await request.post(
//             'https://restful-booker.herokuapp.com/auth',
//             {
//                 data: {
//                     username: 'admin',
//                     password: 'password123'
//                 }
//             }
//         );

//         expect(response.status()).toBe(200);

//         const responseData = await response.json();

//         sessionToken = responseData.token;

//         expect(sessionToken).toBeTruthy();

//         console.log('Session Token:', sessionToken);
//     });


//     // Negative Scenario
//     test('Verify login with invalid credentials', async ({ request }) => {

//         const response = await request.post(
//             'https://restful-booker.herokuapp.com/auth',
//             {
//                 data: {
//                     username: 'invalidUser',
//                     password: 'wrongPassword'
//                 }
//             }
//         );

//         expect(response.status()).toBe(200);

//         const responseData = await response.json();

//         expect(responseData).toHaveProperty('reason');

//         expect(responseData.reason).toBe('Bad credentials');

//         console.log('Invalid Login:', responseData.reason);
//     });


//     // Verify protected API with invalid session
//     test('Verify update booking with invalid session token', async ({ request }) => {

//         const response = await request.put(
//             'https://restful-booker.herokuapp.com/booking/1',
//             {
//                 headers: {
//                     Cookie: 'token=invalid_token'
//                 },
//                 data: {
//                     firstname: 'Tester',
//                     lastname: 'Automation',
//                     totalprice: 500,
//                     depositpaid: true,
//                     bookingdates: {
//                         checkin: '2026-11-20',
//                         checkout: '2026-11-25'
//                     },
//                     additionalneeds: 'Breakfast'
//                 }
//             }
//         );

//         expect(response.status()).toBe(403);

//         console.log('Invalid Session Status:', response.status());
//     });

// });
