
import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

test.describe('Negative API Testing', () => {

  // Scenario 1: GET booking with an invalid ID
  test('GET booking with invalid ID', async ({ request }) => {

    const response = await request.get(
      `${baseURL}/booking/99999999`
    );

    console.log('GET invalid ID');
    console.log('Status:', response.status());
    console.log('Response:', await response.text());

    expect(response.status()).toBe(404);
  });


  // Scenario 2: POST booking without firstname
  test('POST booking without firstname', async ({ request }) => {

    const bookingData = {
      lastname: 'Tester',
      totalprice: 300,
      depositpaid: false,
      bookingdates: {
        checkin: '2026-11-10',
        checkout: '2026-11-15'
      }
    };

    const response = await request.post(
      `${baseURL}/booking`,
      {
        data: bookingData
      }
    );

    const responseBody = await response.text();

    console.log('Missing firstname');
    console.log('Status:', response.status());
    console.log('Response:', responseBody);

    expect(response.status()).toBe(500);
    expect(responseBody).toContain('Internal Server Error');
  });


  // Scenario 3: POST booking with invalid totalprice
  test('POST booking with invalid totalprice', async ({ request }) => {

    const bookingData = {
      firstname: 'Lakshmi',
      lastname: 'Tester',
      totalprice: 'abc',
      depositpaid: false,
      bookingdates: {
        checkin: '2026-11-10',
        checkout: '2026-11-15'
      }
    };

    const response = await request.post(
      `${baseURL}/booking`,
      {
        data: bookingData
      }
    );

    console.log('Invalid totalprice');
    console.log('Status:', response.status());

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('Response:', responseBody);

    // Verify the returned booking data
    expect(responseBody.bookingid).toBeTruthy();
    expect(responseBody.booking.firstname).toBe('Lakshmi');


    expect(responseBody.booking.totalprice).toBeNull();
  });

  // Scenario 4: POST booking with an empty body
  test('POST booking with empty body', async ({ request }) => {

    const response = await request.post(
      `${baseURL}/booking`,
      {
        data: {}
      }
    );

    const responseBody = await response.text();

    console.log('Empty request body');
    console.log('Status:', response.status());
    console.log('Response:', responseBody);

    // Current observed behavior of this practice API
    expect(response.status()).toBe(500);
    expect(responseBody).toContain('Internal Server Error');
  });

});
