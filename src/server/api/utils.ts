/**
 * Utility functions for MCP tool responses
 */
import { logger } from "../../logger.js";

// Response type definition
export type MCPToolResponse = {
	type: "text";
	text: string;
};

/**
 * Format error messages from unknown error types
 */
export function formatErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}
	return String(error);
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
 * Create an error response for MCP tools with detailed logging
 */
export function createErrorResponse(
	baseMessage: string,
	error: unknown,
): MCPToolResponse {
	const errorMessage = formatErrorMessage(error);
	const fullErrorMessage = `${baseMessage}: ${errorMessage}`;

	// Log the full error object for debugging
	logger.error(fullErrorMessage);
	logger.error("Error details:", error);

	// Extract detailed error information if available
	const errorDetails: Record<string, unknown> = {
		error: fullErrorMessage,
	};

	// Try to extract response data from error object (works with Axios and similar libraries)
	if (
		error &&
		typeof error === "object" &&
		"response" in error &&
		error.response &&
		typeof error.response === "object"
	) {
		const response = error.response as Record<string, unknown>;

		if ("status" in response) {
			errorDetails.status = response.status;
		}
		if ("statusText" in response) {
			errorDetails.statusText = response.statusText;
		}
		if ("data" in response) {
			errorDetails.responseData = response.data;
		}
	}

	return {
		type: "text" as const,
		text: JSON.stringify(errorDetails, null, 2),
	};
}
