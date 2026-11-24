
import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
const bookingSchema = {
  type: 'object',
  required: ['bookingid', 'booking'],
  properties: {
    bookingid: { type: 'integer' },
    booking: {
      type: 'object',
      required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates'],
      properties: {
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        totalprice: { type: 'number' },
        depositpaid: { type: 'boolean' },
        bookingdates: {
          type: 'object',
          required: ['checkin', 'checkout'],
          properties: {
            checkin: { type: 'string' },
            checkout: { type: 'string' }
          },
          additionalProperties: false
        },
        additionalneeds: { type: 'string' }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

test('POST booking - Schema Validation', async ({ request }) => {

  // Step 1: Create request data
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

  // Step 2: Send POST request
  const response = await request.post(
    'https://restful-booker.herokuapp.com/booking',
    {
      data: bookingData,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  // Step 3: Validate status code
  expect(response.status()).toBe(200);

  console.log('Status code:', response.status());

  // Step 4: Convert response into JSON
  const responseBody = await response.json();
    
  console.log('Response body:', responseBody);

  // Step 5: Create AJV validator
  const ajv = new Ajv();

  // Step 6: Compile the schema
  const validate = ajv.compile(bookingSchema);

  // Step 7: Validate the response
  const isValid = validate(responseBody);

  // Step 8: Assert schema validation result
  expect(
    isValid,
    JSON.stringify(validate.errors, null, 2)
  ).toBe(true);

  console.log('Schema validation passed');
});
