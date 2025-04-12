const { createHtmlReport } = require("axe-html-reporter");
const fs = require("fs");
const path = require("path");

const reportDir = path.resolve(__dirname, "cypress/reports/axe");
const outputDir = "cypress/reports/axe";
const reportFilename = "axe-report.html"; // Name for the final combined report

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

// Find all JSON files in the report directory
const jsonFiles = fs
	.readdirSync(reportDir)
	.filter(file => file.endsWith(".json"));

if (jsonFiles.length === 0) {
	console.log("No Axe JSON result files found in", reportDir);
	process.exit(0);
}

// Read and parse all JSON results
const axeResults = [];
jsonFiles.forEach(file => {
	const filepath = path.join(reportDir, file);
	try {
		const data = fs.readFileSync(filepath, "utf8");
		const jsonData = JSON.parse(data);
		// axe-html-reporter expects an array of results objects
		// Our saved file contains a single results object, so wrap it
		axeResults.push(jsonData);
	} catch (err) {
		console.error(`Error reading or parsing file ${filepath}:`, err);
	}
});

if (axeResults.length === 0) {
	console.error("Could not read or parse any Axe JSON result files.");
	process.exit(1);
}

// Generate the HTML report
createHtmlReport({
	results: {
		// The reporter expects results under a key (e.g., 'violations')
		// but the structure might vary; let's pass the array directly
		// and see if it handles it, or adjust if needed.
		// UPDATE: Passing the raw results array directly might not work.
		// Let's structure it as expected by the reporter if possible.
		// We need to combine violations from all files into one structure.
		violations: axeResults.reduce(
			(acc, result) => acc.concat(result.violations || []),
			[]
		),
		passes: axeResults.reduce(
			(acc, result) => acc.concat(result.passes || []),
			[]
		),
		incomplete: axeResults.reduce(
			(acc, result) => acc.concat(result.incomplete || []),
			[]
		),
		inapplicable: axeResults.reduce(
			(acc, result) => acc.concat(result.inapplicable || []),
			[]
		),
	},
	options: {
		outputDir: outputDir,
		reportFileName: reportFilename,
		// projectKey: 'YourProject' // Optional: Add project key if desired
	},
});

console.log(
	`Axe HTML report generated at ${path.join(outputDir, reportFilename)}`
);
