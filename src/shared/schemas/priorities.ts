import { z } from "zod";

/**
 * Schema for listing priorities
 */
export const listPrioritiesSchema = {
	projectKey: z
		.string()
		.describe("The project key to filter priorities (e.g., 'KAN')"),
	maxResults: z
		.number()
		.optional()
		.describe("Maximum number of results to return (default: 10)"),
	startAt: z
		.number()
		.optional()
		.describe("Index to start at for pagination (default: 0)"),
};
