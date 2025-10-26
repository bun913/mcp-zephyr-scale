/**
 * Test Plan management tools for Zephyr Scale MCP
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZephyrV2Client } from "../../clients/index.js";
import { createErrorResponse, createSuccessResponse } from "./utils.js";
import {
	listTestPlansSchema,
	createTestPlanSchema,
	getTestPlanSchema,
} from "../../shared/schemas/plans.js";

/**
 * Register all test plan-related tools with the MCP server
 */
export function registerTestPlanTools(
	server: McpServer,
	zephyrClient: ZephyrV2Client,
): void {
	/**
	 * List test plans in a project
	 */
	server.tool(
		"listTestPlans",
		"List test plans in a project / プロジェクト内のテストプラン一覧を取得します",
		listTestPlansSchema,
		async ({ projectKey, maxResults, startAt }) => {
			try {
				const result = await zephyrClient.testplans.listTestPlans(
					{
						projectKey,
						maxResults: maxResults ?? 50,
						startAt: startAt ?? 0,
					},
					{},
				);

				const response = createSuccessResponse(
					"Test plans retrieved successfully",
					{
						testPlans: result.data,
					},
				);

				return {
					content: [{ type: "text", text: response.text }],
					isError: false,
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					`Error listing test plans for project: ${projectKey}`,
					error,
				);
				return {
					content: [{ type: "text", text: errorResponse.text }],
					isError: true,
				};
			}
		},
	);

	/**
	 * Create a new test plan
	 */
	server.tool(
		"createTestPlan",
		"Create a new test plan / 新しいテストプランを作成します",
		createTestPlanSchema,
		async ({
			projectKey,
			name,
			objective,
			statusName,
			folderId,
			customFields,
		}) => {
			try {
				const result = await zephyrClient.testplans.createTestPlan(
					{
						projectKey,
						name,
						objective,
						...(statusName && { statusName }),
						...(folderId !== undefined && { folderId }),
						...(customFields && { customFields }),
					},
					{},
				);

				const response = createSuccessResponse(
					"Test plan created successfully",
					{
						testPlan: result.data,
					},
				);

				return {
					content: [{ type: "text", text: response.text }],
					isError: false,
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					`Error creating test plan: ${name}`,
					error,
				);
				return {
					content: [{ type: "text", text: errorResponse.text }],
					isError: true,
				};
			}
		},
	);

	/**
	 * Get details of a specific test plan
	 */
	server.tool(
		"getTestPlan",
		"Get details of a specific test plan / 特定のテストプランの詳細を取得します",
		getTestPlanSchema,
		async ({ testPlanIdOrKey }) => {
			try {
				const result = await zephyrClient.testplans.getTestPlan(
					testPlanIdOrKey,
					{},
				);

				const response = createSuccessResponse(
					"Test plan retrieved successfully",
					{
						testPlan: result.data,
					},
				);

				return {
					content: [{ type: "text", text: response.text }],
					isError: false,
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					`Error retrieving test plan: ${testPlanIdOrKey}`,
					error,
				);
				return {
					content: [{ type: "text", text: errorResponse.text }],
					isError: true,
				};
			}
		},
	);
}
