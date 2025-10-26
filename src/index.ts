#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ZephyrV2Client } from "zephyr-api-client";
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
const zephyrClient = new ZephyrV2Client({
	apiToken,
});

// Create McpServer
const server = new McpServer({
	name: "Zephyr Scale MCP Server",
	version: "0.2.0",
});

// Register a simple tool for testing
server.tool(
	"hello",
	"Say hello - a simple test tool",
	{
		name: {
			type: "string",
			description: "Name to greet",
		},
	},
	async ({ name }) => {
		return {
			content: [
				{
					type: "text",
					text: `Hello, ${name}! This is Zephyr Scale MCP Server. Connected to project: ${projectKey}`,
				},
			],
		};
	},
);

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
