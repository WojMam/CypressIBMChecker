const { defineConfig } = require("cypress");
const fs = require("fs"); // Import fs for file writing
// No longer need to require the IBM plugin
// const accessibilityChecker = require("cypress-accessibility-checker/plugin");

module.exports = defineConfig({
	// Remove Mochawesome reporter options
	// reporter: "cypress-mochawesome-reporter",
	// reporterOptions: {
	//  reportDir: "cypress/reports",
	//  overwrite: false,
	//  html: true,
	//  json: true,
	//  showCode: false,
	// },
	e2e: {
		// Explicitly set the support file path (even though it's the default)
		supportFile: "cypress/support/e2e.js",
		setupNodeEvents(on, config) {
			// Register Cypress tasks
			on("task", {
				// Task to log tables to the console
				logTable(data) {
					console.table(data);
					return null; // Required for Cypress tasks
				},
				// Renamed Task: Save Axe results to a JSON file
				saveAxeResultsToFile({ results, filepath }) {
					const dir = require("path").dirname(filepath);
					if (!fs.existsSync(dir)) {
						fs.mkdirSync(dir, { recursive: true });
					}
					fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
					return null;
				},
			});

			// Remove Mochawesome plugin registration
			// require("cypress-mochawesome-reporter/plugin")(on);

			// It is required to return the config object
			// unless you modify it yourself
			return config;
		},
	},
});
