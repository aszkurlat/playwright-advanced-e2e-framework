import { test, expect, request } from "@playwright/test";
import { logWithStep } from "../helpers/logger.js";
import constants from "../../data/constants.json";
import TestData from "../../data/test-data.js";

test.describe("REST API Tests", () => {
    let envConfig = process.env.API_URL ?? "https://reqres.in/api"
    // GET Method
    test("Should get list of users", async ({ request }) => {
        // Make a GET call
        await logWithStep("info", `Making a GET call using ${envConfig}`);
        console.log("API URL:", envConfig);
        console.log("Endpoint:", `${envConfig}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`);
        const res = await request.get(`${envConfig}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`, {
            headers: {
                "x-api-key": process.env.RES_RES_API_KEY,
            },
        });

        // Assert the status code
        expect(res.status()).toBe(200);
        await logWithStep("info", `The GET call is succesfull with ${res.status()}`);

        // Get list of users
        const userData = await res.json();
        logWithStep("info", `List of users: ${JSON.stringify(userData)}`);
    });

    // POST Method
    test("Should create a user", async ({ request }) => {
        // Make a GET call
        await logWithStep("info", `Making a POST call using ${envConfig}`);
        const payload = TestData.apiUserReqresCreation()[0];

        const res = await request.post(`${envConfig}${constants.REQ_RES_ENDPOINTS.POST_USER}`, {
            headers: {
                "x-api-key": process.env.REQ_RES_API_KEY,
                "Content-Type": "application/json",
            },
            data: payload,
        });

        // Assert the status code
        console.log("Response Status:", res.status());
        expect(res.status()).toBe(201);
        await logWithStep("info", `The POST call is succesfull with ${res.status()}`);

        // Get list of users
        const restData = await res.json();
        logWithStep("info", `Response data from post call: ${JSON.stringify(restData)}`);
    });
});