import { defineConfig, devices } from '@playwright/test';

import * as fs from 'fs';
import * as path from 'path';

const config = process.env.ENV || '';
const envPath = path.resolve(__dirname, `./config/${config}.env.json`);

let env: any = {};

if (fs.existsSync(envPath)) {
  env = require(envPath);
} else {
  console.error(`Environment file for '${config}' does not exist at path: ${envPath}`);
  process.exit(1);
}

export const environment = env;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 200000, // Set global timeout to 200 seconds
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'on',
    ignoreHTTPSErrors: true,
    launchOptions: {
     args: ['--ignore-certificate-errors']
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
       },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ],

});
