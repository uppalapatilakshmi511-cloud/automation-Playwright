
import { expect, test } from '@playwright/test';

test('POST booking without headers', async ({ request }) => {

  const url = 'https://restful-booker.herokuapp.com/booking';

  const bookingData = {
    firstname: 'Lakshmi',
    lastname: 'Tester',
    totalprice: 300,
    depositpaid: false,
    bookingdates: {
      checkin: '2026-11-10',
      checkout: '2026-11-15'
    },
    additionalneeds: 'Lunch'
  };

  // Send POST request without adding headers
  const response = await request.post(url, {
    data: bookingData
  });

  console.log('Status Code:', response.status());

  // Validate status code
  expect(response.status()).toBe(200);

  // Get response body
  const responseBody = await response.json();

  // Validate booking ID
  const bookingId = responseBody.bookingid;
  expect(bookingId).toBeTruthy();

  console.log('Booking ID:', bookingId);

  // Validate response body using values
  expect(responseBody.booking.firstname).toBe('Lakshmi');
  expect(responseBody.booking.lastname).toBe('Tester');
  expect(responseBody.booking.totalprice).toBe(300);
  expect(responseBody.booking.depositpaid).toBe(false);
  expect(responseBody.booking.bookingdates.checkin).toBe('2026-11-10');
  expect(responseBody.booking.bookingdates.checkout).toBe('2026-11-15');
  expect(responseBody.booking.additionalneeds).toBe('Lunch');

  // Print response body
  console.log('Response Body:', responseBody);

});
