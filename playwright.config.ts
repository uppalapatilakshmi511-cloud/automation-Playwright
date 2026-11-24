
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({

  // Test folder
  testDir: './tests',

  // Maximum time for each test
  timeout: 60000,

  // Maximum time for each assertion
  expect: {
    timeout: 15000
  },

  // Run tests one at a time
  fullyParallel: false,
  workers: 1,

  // Do not retry failed tests
  retries: 0,

  // Show results in terminal
  reporter: 'list',

  use: {
    baseURL: 'https://www.flipkart.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  projects: [

    // Authentication setup project
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts'
    },

    // Login authentication test only
    {
      name: 'login-auth',
      testMatch: '**/loginAuthPage.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
        headless: false
      }
    },

    // Normal Chrome tests without authentication
    {
      name: 'chrome',
      testIgnore: [
        '**/auth.setup.ts',
        '**/loginAuthPage.ts'
      ],
      use: {
        ...devices['Desktop Chrome'],
        storageState: { cookies: [], origins: [] },
        headless: false
      }
    }

  ]
});
