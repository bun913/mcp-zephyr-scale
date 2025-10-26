#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

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
					text: `Hello, ${name}! This is Zephyr Scale MCP Server.`,
				},
			],
		};
	},
);

// Main execution
const main = async () => {
	try {
		console.error("Starting Zephyr Scale MCP Server (stdio mode)...");

		// Create and connect transport
		const transport = new StdioServerTransport();
		await server.connect(transport);

		console.error("Zephyr Scale MCP Server connected via stdio");
	} catch (error) {
		console.error("Error starting Zephyr Scale MCP Server:", error);
		process.exit(1);
	}
};

// Run the server
main();
