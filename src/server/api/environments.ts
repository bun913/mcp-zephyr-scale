/**
 * Environment management tools for Zephyr Scale MCP
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZephyrV2Client } from "../../clients/index.js";
import { createErrorResponse, createSuccessResponse } from "./utils.js";
import { listEnvironmentsSchema } from "../../shared/schemas/environments.js";

/**
 * Register all environment-related tools with the MCP server
 */
export function registerEnvironmentTools(
	server: McpServer,
	zephyrClient: ZephyrV2Client,
): void {
	/**
	 * List environments
	 */
	server.tool(
		"listEnvironments",
		"List environments / 環境一覧を取得します",
		listEnvironmentsSchema,
		async ({ projectKey, maxResults, startAt }) => {
			try {
				const result = await zephyrClient.environments.listEnvironments(
					{
						projectKey,
						maxResults: maxResults ?? 10,
						startAt: startAt ?? 0,
					},
					{},
				);

				const response = createSuccessResponse(
					"Environments retrieved successfully",
					{
						environments: result.data,
					},
				);

				return {
					content: [{ type: "text", text: response.text }],
					isError: false,
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					`Error listing environments for project: ${projectKey}`,
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
