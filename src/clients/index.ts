/**
 * Zephyr API Client Factory
 * Simple factory function to create ZephyrV2Client instances
 */

import { ZephyrV2Client } from "zephyr-api-client";
import { logger } from "../logger.js";

export * from "./types.js";

/**
 * Create a new Zephyr API client instance
 * @param apiToken - Zephyr API token
 * @returns ZephyrV2Client instance
 */
export function createZephyrClient(apiToken: string): ZephyrV2Client {
	logger.info("Creating Zephyr API Client");
	return new ZephyrV2Client({ apiToken });
}
