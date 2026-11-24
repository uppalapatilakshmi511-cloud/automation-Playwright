
import { expect, test } from '@playwright/test';

test('POST booking with headers', async ({ request }) => {

  const url = 'https://restful-booker.herokuapp.com/booking';

  const bookingData = {
    firstname: 'Lakshmi',
    lastname: 'Tester',
    totalprice: 250,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-11-01',
      checkout: '2026-11-20'
    },
    additionalneeds: 'Breakfast'
  };

  // Headers
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  // Send POST request
  const response = await request.post(url, {
    headers: headers,
    data: bookingData
  });

  // Validate status code
  expect(response.status()).toBe(200);

  // Get response body
  const responseBody = await response.json();

  // Validate response body
  expect(responseBody.bookingid).toEqual(expect.any(Number));
  expect(responseBody.booking.firstname).toBe('Lakshmi');
  expect(responseBody.booking.lastname).toBe('Tester');
  expect(responseBody.booking.totalprice).toBe(250);
  expect(responseBody.booking.depositpaid).toBe(true);
  expect(responseBody.booking.bookingdates.checkin).toBe('2026-11-01');
  expect(responseBody.booking.bookingdates.checkout).toBe('2026-11-05');
  expect(responseBody.booking.additionalneeds).toBe('Breakfast');

  console.log(responseBody);

});
