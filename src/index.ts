#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createZephyrClient } from "./clients/index.js";
import { registerAllTools } from "./server/api/index.js";
import { logger } from "./logger.js";

/**
 * Validate required environment variables
 */
function validateEnvironment(): {
	apiToken: string;
	projectKey: string;
} {
	const apiToken = process.env.ZEPHYR_API_TOKEN;
	const projectKey = process.env.JIRA_PROJECT_KEY;

	if (!apiToken || !projectKey) {
		throw new Error("ZEPHYR_API_TOKEN and JIRA_PROJECT_KEY must be set");
	}

	return { apiToken, projectKey };
}

// Validate environment variables
const { apiToken, projectKey } = validateEnvironment();

// Initialize Zephyr client
const zephyrClient = createZephyrClient(apiToken);

// Create McpServer
const server = new McpServer({
	name: "Zephyr Scale MCP Server",
	version: "0.2.0",
});

// Register all MCP tools
registerAllTools(server, zephyrClient);

// Main execution
const main = async () => {
	try {
		logger.info("Starting Zephyr Scale MCP Server (stdio mode)...");
		logger.info(`Project Key: ${projectKey}`);

		// Create and connect transport
		const transport = new StdioServerTransport();
		await server.connect(transport);

		logger.info("Zephyr Scale MCP Server connected via stdio");
	} catch (error) {
		logger.error("Error starting Zephyr Scale MCP Server:", error);
		process.exit(1);
	}
};

// Run the server
main();
