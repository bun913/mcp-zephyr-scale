/**
 * Link management tools for Zephyr Scale MCP
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZephyrV2Client } from "../../clients/index.js";
import { createErrorResponse, createSuccessResponse } from "./utils.js";
import { deleteLinkSchema } from "../../shared/schemas/links.js";

/**
 * Register all link-related tools with the MCP server
 */
export function registerLinkTools(
	server: McpServer,
	zephyrClient: ZephyrV2Client,
): void {
	/**
	 * Delete a link
	 */
	server.tool(
		"deleteLink",
		"Delete a link / リンクを削除します",
		deleteLinkSchema,
		async ({ linkId }) => {
			try {
				await zephyrClient.links.deleteLink(linkId, {});

				const response = createSuccessResponse("Link deleted successfully", {
					linkId,
				});

				return {
					content: [{ type: "text", text: response.text }],
					isError: false,
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					`Error deleting link ID: ${linkId}`,
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
