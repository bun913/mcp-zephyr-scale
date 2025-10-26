import { describe, it, expect } from "vitest";

describe("Basic test", () => {
	it("should pass a simple assertion", () => {
		expect(1 + 1).toBe(2);
	});

	it("should work with strings", () => {
		const greeting = "Hello, Zephyr Scale MCP Server!";
		expect(greeting).toContain("Zephyr Scale");
	});

	it("should work with objects", () => {
		const serverInfo = {
			name: "Zephyr Scale MCP Server",
			version: "0.2.0",
		};
		expect(serverInfo.name).toBe("Zephyr Scale MCP Server");
		expect(serverInfo.version).toBe("0.2.0");
	});
});
