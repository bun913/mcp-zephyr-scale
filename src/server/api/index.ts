/**
 * Central registry for all MCP tools
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZephyrV2Client } from "zephyr-api-client";
import { registerTestCaseTools } from "./cases.js";
import { registerFolderTools } from "./folders.js";
import { registerTestPlanTools } from "./plans.js";
import { registerTestCycleTools } from "./cycles.js";
import { registerTestExecutionTools } from "./executions.js";
import { registerStatusTools } from "./statuses.js";
import { registerPriorityTools } from "./priorities.js";
import { registerEnvironmentTools } from "./environments.js";

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

	// Register test plan tools
	registerTestPlanTools(server, zephyrClient);

	// Register test cycle tools
	registerTestCycleTools(server, zephyrClient);

	// Register test execution tools
	registerTestExecutionTools(server, zephyrClient);

	// Register status tools
	registerStatusTools(server, zephyrClient);

	// Register priority tools (read-only)
	registerPriorityTools(server, zephyrClient);

	// Register environment tools (read-only)
	registerEnvironmentTools(server, zephyrClient);
}
