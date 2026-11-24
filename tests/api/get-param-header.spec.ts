
import { expect, test } from '@playwright/test';

test('GET booking with headers', async ({ request }) => {

  // Booking ID
  const bookingId = 1;

  const url = `https://restful-booker.herokuapp.com/booking/${bookingId}`;

  // Headers
  const headers = {
    Accept: 'application/json'
  };

  // Send GET request with headers
  const response = await request.get(url, {
    headers: headers
  });

  // Validate status code
  expect(response.status()).toBe(200);

  // Get response body
  const responseBody = await response.json();

  // Validate response body using POST values
  expect(responseBody.firstname).toBe('Lakshmi');
  expect(responseBody.lastname).toBe('Tester');
  expect(responseBody.totalprice).toBe(250);
  expect(responseBody.depositpaid).toBe(true);
  expect(responseBody.bookingdates.checkin).toBe('2026-11-01');
  expect(responseBody.bookingdates.checkout).toBe('2026-11-20');
  expect(responseBody.additionalneeds).toBe('Breakfast');

  // Print individual values
  console.log('First Name:', responseBody.firstname);
  console.log('Last Name:', responseBody.lastname);
  console.log('Total Price:', responseBody.totalprice);
  console.log('Deposit Paid:', responseBody.depositpaid);
  console.log('Check-in:', responseBody.bookingdates.checkin);
  console.log('Check-out:', responseBody.bookingdates.checkout);
  console.log('Additional Needs:', responseBody.additionalneeds);

  // Print complete response body
  console.log('Response Body:', responseBody);

});
