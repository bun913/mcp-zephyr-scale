import { z } from "zod";

/**
 * Schema for listing test plans
 */
export const listTestPlansSchema = {
	projectKey: z
		.string()
		.describe("The project key to filter test plans (e.g., 'KAN')"),
	maxResults: z
		.number()
		.optional()
		.describe("Maximum number of results to return (default: 50)"),
	startAt: z
		.number()
		.optional()
		.describe("Index to start at for pagination (default: 0)"),
};

/**
 * Schema for creating a test plan
 */
export const createTestPlanSchema = {
	projectKey: z.string().describe("The project key (e.g., 'KAN')"),
	name: z.string().describe("Test plan name"),
	objective: z.string().optional().describe("A description of the objective"),
	statusName: z.string().optional().describe("Status name (e.g., 'Draft')"),
	folderId: z.number().optional().describe("Folder ID to organize test plan"),
	customFields: z
		.record(z.any())
		.optional()
		.describe(
			"Additional custom fields as key-value pairs. Multi-line text fields should denote a new line with the <br> syntax. Dates should be in the format 'yyyy-MM-dd'. Users should be provided by the user ID.",
		),
};

/**
 * Schema for getting a test plan
 */
export const getTestPlanSchema = {
	testPlanIdOrKey: z.string().describe("Test plan ID or key (e.g., 'KAN-P1')"),
};
