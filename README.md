```sh
PLAYWRIGHT-ADVANCED-E2E-FRAMEWORK/
├── .github/                # CI configuration (GitHub Actions)
├── .vscode/                # Editor-specific settings
│ └── mcp.json              # MCP server config for VS Code
├── config/                 # Environment-specific config files
├── data/                   # Static data and test constants
│ └── constants.json        # Common constants shared across tests
├── debug/                  # Debug-related outputs/logs (traces, HAR)
├── logs/                   # Application/test execution logs
├── node_modules/           # Auto-generated project dependencies
├── playwright-report/      # Playwright HTML test report
├── resources/              # Misc test resources (fixtures, assets)
├── test-results/           # Test run artifacts (screenshots, videos)
│ └── .last-run.json        # Metadata of the last executed run
├── tests/                  # Main automated test suite
│ ├── api/                  # API test specifications
│ ├── demo/                 # Demo / sandbox test scenarios
│ ├── devices/              # Device-specific test cases (RWD)
│ ├── e2e/                  # End-to-End business flow tests
│ ├── functional/           # Functional test cases
│ ├── helpers/              # Helper functions, utilities, builders
│ └── page-objects/         # Page Object Model (POM) classes
├── tests-examples/         # Auto-generated Playwright example tests
├── .env                    # Environment variables for local runs
├── .env.example            # Template for environment variables
├── .gitignore              # Git ignored files and folders
├── package-lock.json       # Dependency lockfile
├── package.json            # Project metadata, scripts, dependencies
├── playwright.config.ts    # Global Playwright configuration
└── README.md               # Project overview and instructions
```