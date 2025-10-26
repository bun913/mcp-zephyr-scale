/**
 * Central registry for all MCP tools
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZephyrV2Client } from "zephyr-api-client";
import { registerTestCaseTools } from "./cases.js";
import { registerFolderTools } from "./folders.js";

/**
 * Register all Zephyr Scale MCP tools
 */
export function registerAllTools(
	server: McpServer,
	zephyrClient: ZephyrV2Client,
): void {
	// Register test case tools
	registerTestCaseTools(server, zephyrClient);

	// Register folder tools
	registerFolderTools(server, zephyrClient);

	// Future: Register other tools
	// registerTestPlanTools(server, zephyrClient);
	// registerTestCycleTools(server, zephyrClient);
	// registerTestExecutionTools(server, zephyrClient);
	// registerEnvironmentTools(server, zephyrClient);
}
