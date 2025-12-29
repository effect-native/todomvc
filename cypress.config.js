const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000/examples/',
    viewportWidth: 890,
    numTestsKeptInMemory: 1,
    projectId: 'n4ynap',
    specPattern: 'cypress/integration/**/*.js',
    supportFile: 'cypress/support/index.js',
  },
})
