import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Define test environment
  test: {
    // Specify environments, e.g., "happy-dom", "jsdom", "node"
    // environment: 'node',

    // Glob patterns to find test files
    include: ['tests/**/*.test.js'],

    // // Set up coverage if needed
    // coverage: {
    //   provider: 'istanbul', // or "c8"
    //   reporter: ['text', 'json', 'html'],
    // },

    // Configure mocks and stubs
    // mocks: {},
    // stubs: {},

    // Specify other Vitest options as needed
    // globals: true,
    // setupFiles: './test/setupTests.js',
  },

  // Configure Vite options (if needed, for using Vite features in tests)
  // vite: {
  //   plugins: [],
  //   resolve: {},
  // },
});
