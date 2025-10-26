/**
 * Test script for Zephyr API Client
 * This script tests basic operations: folder creation, test case creation, and test step management
 */

import "dotenv/config";
import { createZephyrClient } from "../src/clients/index.js";

const apiToken = process.env.ZEPHYR_API_TOKEN;
const projectKey = process.env.JIRA_PROJECT_KEY;

if (!apiToken || !projectKey) {
	console.error("ZEPHYR_API_TOKEN and JIRA_PROJECT_KEY must be set");
	process.exit(1);
}

async function main() {
	console.log("=== Zephyr API Client Test ===\n");

	const client = createZephyrClient(apiToken);

	try {
		// 1. Create a folder
		console.log("1. Creating a test folder...");
		const folderResult = await client.folders.createFolder(
			{
				projectKey,
				name: `Test Folder ${Date.now()}`,
				folderType: "TEST_CASE",
			},
			{},
		);
		console.log("✓ Folder created:", folderResult);
		const folderId = folderResult.data.id;

		// 2. Create a test case
		console.log("\n2. Creating a test case...");
		const testCaseResult = await client.testcases.createTestCase(
			{
				projectKey,
				name: `Test Case ${Date.now()}`,
				objective: "Test objective",
				precondition: "Test precondition",
				folder: folderId,
			},
			{},
		);
		console.log("✓ Test case created:", testCaseResult);
		const testCaseKey = testCaseResult.data.key;

		// 3. Add test steps
		console.log("\n3. Adding test steps...");
		const testStepsResult = await client.testcases.createTestCaseTestSteps(
			testCaseKey,
			{
				mode: "APPEND",
				items: [
					{
						inline: {
							description: "Step 1: Open the application",
							testData: "URL: https://example.com",
							expectedResult: "Application should open successfully",
						},
					},
					{
						inline: {
							description: "Step 2: Login with credentials",
							testData: "Username: test@example.com",
							expectedResult: "User should be logged in",
						},
					},
				],
			},
			{},
		);
		console.log("✓ Test steps added:", testStepsResult);

		// 4. Get test case with steps
		console.log("\n4. Fetching test case details...");
		const testCase = await client.testcases.getTestCase(testCaseKey, {});
		console.log("✓ Test case details:", testCase.data);

		// 5. Get test steps
		console.log("\n5. Fetching test steps...");
		const testSteps = await client.testcases.getTestCaseTestSteps(
			testCaseKey,
			{},
			{},
		);
		console.log("✓ Test steps:", testSteps.data);

		// 6. Update test case (must include all required fields)
		console.log("\n6. Updating test case...");
		await client.testcases.updateTestCase(
			testCaseKey,
			{
				...testCase.data,
				name: `${testCase.data.name} (Updated)`,
				objective: "Updated objective",
			},
			{},
		);
		console.log("✓ Test case updated");

		// 7. Verify the update
		console.log("\n7. Verifying the update...");
		const updatedTestCase = await client.testcases.getTestCase(testCaseKey, {});
		console.log("✓ Updated test case name:", updatedTestCase.data.name ?? "N/A");
		console.log("✓ Updated objective:", updatedTestCase.data.objective ?? "N/A");

		console.log("\n=== All tests passed! ===");
	} catch (error) {
		console.error("\n❌ Error during testing:");
		if (error instanceof Error && "response" in error) {
			const axiosError = error as {
				response?: { data?: unknown; status?: number };
				config?: { url?: string; method?: string };
			};
			console.error("Status:", axiosError.response?.status);
			console.error("URL:", axiosError.config?.method, axiosError.config?.url);
			console.error("Response data:", JSON.stringify(axiosError.response?.data, null, 2));
		} else {
			console.error(error);
		}
		process.exit(1);
	}
}

main();
