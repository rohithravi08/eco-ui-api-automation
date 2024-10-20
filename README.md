# eco-ui-api-automation

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Directory Structure](#directory-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)


## Introduction
This project is a testing framework built using [Playwright](https://playwright.dev/) for UI E2E (E2E) testing & API testing. 

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)
- Docker (if using Docker to run tests)
- Git
- VS code

## Installation
### Cloning the Repository
1. Clone this repository to your local machine:
    ```
    https://github.com/rohithravi08/eco-ui-api-automation.git
    ```

2. Navigate to the root folder and execute:
    ```
    npm init playwright@latest
    ```
    Then follow the default steps


## Running Tests
### Running Tests Locally

To execute the tests, pass the following environment variables:

- `$env:ENV`: Set to `"Prod"`, `"Dev"`, or `"Stage"` to execute the tests against the desired environment.
- `$env:API_TOKEN`: Pass your API token as a string.

```
#Execute all the test locally
$env:ENV=${env}; $env:API_TOKEN="your_api_token"; npx playwright test

#Execute all the test locally in GUI mode
$env:ENV=${env}; $env:API_TOKEN="your_api_token"; npx playwright test --ui


#Execute all the test locally in GUI mode against chromium browser
$env:ENV=${env}; $env:API_TOKEN="your_api_token"; npx playwright test --ui --project=chromium

#Execute all the test locally against chromium browser in headed mode
$env:ENV=${env}; $env:API_TOKEN="your_api_token"; npx playwright test --project=chromium --headed

#Execute all the test locally in GUI mode against chromium browser in headed mode with tags
$env:ENV=${env}; $env:API_TOKEN="your_api_token"; npx playwright test --ui --project=chromium --grep "@regression"

```
### Running Tests in Docker

```
$env:ENV=${env}; $env:API_TOKEN="your_api_token"; docker-compose up --build 
```

## Writing Tests
```
// tests/example.test.js
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('/');
  const title = await page.title();
  expect(title).toBe('Your Page Title');
});
```
## Directory Structure
```
ECO-UI-API-Automation/
├── config                  # base URL and userdata for a specific environment
├── page-objects            # methods and locator for the specif pages
├── test-data               # request json file for API tests
├── tests/UI                # Test files for UI
│   └── salesE2E.spec.ts
├── tests/API               # Test files for API 
│   └── api_tests.spec.ts
├── Dockerfile              # Docker configuration
├── playwright.config.js    # Playwright configuration
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
└── TestPlan.md             # Test plan for the payment gateway integration
└── TestPriority.md         # Test priorty documentation
```


