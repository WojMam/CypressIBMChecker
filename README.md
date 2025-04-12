# Cypress Accessibility Checker PoC

Proof-of-Concept project demonstrating automated web accessibility testing using Cypress and the IBM `cypress-accessibility-checker`.

## Features

- Tests accessibility of a given web page.
- Uses `cypress-axe` based on the `axe-core` engine.
- Accepts target URL via command-line argument.
- Generates detailed HTML reports using `axe-html-reporter`.
- Follows Page Object Model (POM) for test structure.
- Basic Clean Code principles applied.

## Project Structure

```
.
├── cypress
│   ├── e2e                 # End-to-end test files (specs)
│   │   └── accessibility.cy.js
│   ├── fixtures            # Test data
│   │   └── example.json
│   ├── pages               # Page Object Model files
│   │   ├── BasePage.js
│   │   └── TestedPage.js
│   ├── reports
│   │   └── axe             # Axe JSON results and HTML reports
│   ├── screenshots         # Screenshots taken on test failure (if any)
│   ├── support             # Support files (commands, plugins)
│   │   ├── commands.js
│   │   └── e2e.js          # Imports cypress-axe
│   └── videos              # Videos recorded during test runs (if enabled)
├── node_modules
├── .gitignore
├── cypress.config.js       # Cypress configuration (incl. axe results task)
├── package.json
├── package-lock.json
└── README.md
```

## Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd cypress-accessibility-checker-poc
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

To run the accessibility scan and automatically generate the HTML report, use the following command:

```bash
npm run test:a11y --url=<your-target-url>
```

**Example:**

```bash
npm run test:a11y --url=https://dequeuniversity.com/demo/mars/
```

Replace `<your-target-url>` with the actual URL you want to test.

This command performs the following steps:

1. Runs the Cypress test (`cypress/e2e/accessibility.cy.js`).
2. Visits the specified URL.
3. Injects `axe-core` and runs an accessibility scan.
4. Saves the raw Axe results to a JSON file in `cypress/reports/axe/`.
5. Runs the `generate-axe-report.js` script to process the JSON file.
6. Creates a detailed HTML report (`axe-report.html`) in `cypress/reports/axe/`.

Open the generated `axe-report.html` file in your browser to view the detailed accessibility report, including specific violations and affected elements.

## Vibe Coding Approach

This project aims for:

- **Readability:** Clear variable names, concise code, and logical structure.
- **Simplicity:** Easy setup and execution with a single command.
- **Maintainability:** Use of POM and clear separation of concerns.
- **User Experience:** Clear instructions and informative reports.
