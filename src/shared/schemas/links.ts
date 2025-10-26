import { z } from "zod";

/**
 * Schema for deleting a link
 */
export const deleteLinkSchema = {
	linkId: z.number().describe("Link ID"),
};
