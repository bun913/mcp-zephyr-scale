/**
 * Utility functions for MCP tool responses
 */

// Response type definition
export type MCPToolResponse = {
	type: "text";
	text: string;
};

/**
 * Format error messages from unknown error types
 */
export function formatErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

/**
 * Create a success response for MCP tools
 */
export function createSuccessResponse(
	message: string,
	data?: Record<string, unknown>,
): MCPToolResponse {
	return {
		type: "text" as const,
		text: JSON.stringify(
			{
				message,
				...(data || {}),
			},
			null,
			2,
		),
	};
}

/**
 * Create an error response for MCP tools
 */
export function createErrorResponse(
	baseMessage: string,
	error: unknown,
): MCPToolResponse {
	const errorMessage = formatErrorMessage(error);
	return {
		type: "text" as const,
		text: JSON.stringify(
			{
				error: `${baseMessage}: ${errorMessage}`,
			},
			null,
			2,
		),
	};
}
