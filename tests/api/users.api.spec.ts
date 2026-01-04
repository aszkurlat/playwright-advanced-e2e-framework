import { test, expect } from "@playwright/test";
import { logWithStep } from "../helpers/logger";
import constants from "../../data/constants.json";
import TestData from "../../data/test-data";

test.describe("Users API", () => {
    const baseURL = process.env.API_URL ?? "https://dummyjson.com";

    test.describe("GET /users", () => {
        test("should return non-empty users list", async ({ request }) => {
            await logWithStep("info", `Making a GET call using ${baseURL}`);

            const res = await request.get(`${baseURL}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`);

            expect(res.status()).toBe(200);
            expect(res.headers()["content-type"] ?? "").toContain("application/json");

            const body = await res.json();
            expect(body.users.length).toBeGreaterThan(0);

            await logWithStep("info", `Number of users received: ${body.users.length}`);
        });
    });

    test.describe("POST /users/add", () => {
        const users = TestData.apiUserCreation();

        users.forEach((user) => {
            test(`should create user: ${user.data.firstName} ${user.data.lastName}`, async ({ request }) => {
                const res = await request.post(
                    `${baseURL}${constants.REQ_RES_ENDPOINTS.POST_USER}`,
                    { data: user.data, headers: user.headers }
                );

                expect(res.status()).toBe(201);
                expect(res.headers()["content-type"] ?? "").toContain("application/json");

                const body = await res.json();
                expect(body.firstName).toBe(user.data.firstName);
            });
        });
    });
});
