/// <reference types="cypress" />
/// <reference types="cypress-axe" />

import TestedPage from "../pages/TestedPage";

describe("Accessibility Check", () => {
	// Get the target URL from Cypress environment variable or default to example.com
	const targetUrl = Cypress.env("TARGET_URL") || "https://example.com";
	const reportDir = "cypress/reports/axe"; // Directory for Axe results

	// Use function() for the 'it' block to ensure 'this' context if needed later
	it(`Should report accessibility violations on ${targetUrl}`, function () {
		TestedPage.visit(targetUrl);
		cy.injectAxe();

		// Run axe-core directly within the browser context
		cy.window({ log: false })
			.then(win => {
				// Run Axe and return the promise
				// Pass null context to check the entire document
				return win.axe.run(win.document.body, {
					// Optional: Add rules configuration here if needed
					// e.g., runOnly: { type: 'tag', values: ['wcag2a'] }
				});
			})
			.then(results => {
				// This block receives the full results object
				if (results.violations.length > 0) {
					// Optional: Log summary table to terminal
					const summary = results.violations.map(({ id, impact, nodes }) => ({
						Rule: id,
						Impact: impact,
						Nodes: nodes.length,
					}));
					cy.task("logTable", summary);
				}

				// Save the full results object using the task
				const filename = targetUrl.replace(/[^a-z0-9]/gi, "_").toLowerCase();
				const filepath = `${reportDir}/${filename}.json`;
				cy.task("saveAxeResultsToFile", { results, filepath });
				cy.log(`Full Axe results saved to ${filepath}`);
			});
		// No assertion here - we just want to report
	});
});
