import { test as base } from "@playwright/test";

/**
 * Represents the configuration settings for a specific environment.
 *
 * @property envName - The name of the environment (e.g., "development", "staging", "production").
 *   This variable is used to distinguish between different deployment or testing environments,
 *   allowing the application or tests to adapt their behavior accordingly.
 * @property appURL - The base URL of the application under test.
 * @property dbConfig - The database configuration object for the environment.
 * @property nopCommerceWeb - The URL for the nopCommerce web application.
 * @property apiURL - The base URL for the API endpoints.
 */
export type EnvConfig = {
    envName: string;
    appURL: string;
    dbConfig: {};
    nopCommerceWeb: string;
    apiURL: string;
};

