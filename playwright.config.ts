import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: [['list'], ['json', { outputFile: 'test-results/test-results.json' }]],
  outputDir: 'test-results/',
});
