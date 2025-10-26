# Zephyr Scale MCP Server

MCP Server for Zephyr Scale test management tool.

## Features

This MCP server provides comprehensive access to Zephyr Scale API v2, enabling:

- **Test Case Management**: Create, read, update test cases and test steps
- **Test Planning**: Manage test plans and link them to test cycles
- **Test Execution**: Create and track test executions within test cycles
- **Folder Organization**: Organize test artifacts with folders
- **Status Management**: Manage custom statuses for test entities
- **Link Management**: Create web links, issue links, and entity links between test artifacts
- **Read-only Access**: List priorities and environments configured in your project

## Available Tools

### Test Cases

| Tool Name | Description |
|-----------|-------------|
| `listTestCases` | List test cases in a project |
| `createTestCase` | Create a new test case |
| `getTestCase` | Get details of a specific test case |
| `updateTestCase` | Update an existing test case |
| `getTestCaseTestSteps` | Get test steps for a test case |
| `createTestCaseTestSteps` | Create or append test steps to a test case |
| `createTestCaseWebLink` | Create a web link for a test case |
| `createTestCaseIssueLink` | Create an issue link for a test case |

### Folders

| Tool Name | Description |
|-----------|-------------|
| `listFolders` | List folders in a project |
| `createFolder` | Create a new folder |
| `getFolder` | Get details of a specific folder |

### Test Plans

| Tool Name | Description |
|-----------|-------------|
| `listTestPlans` | List test plans in a project |
| `createTestPlan` | Create a new test plan |
| `getTestPlan` | Get details of a specific test plan |
| `createTestPlanWebLink` | Create a web link for a test plan |
| `createTestPlanIssueLink` | Create an issue link for a test plan |
| `createTestPlanTestCycleLink` | Create a test cycle link for a test plan |

### Test Cycles

| Tool Name | Description |
|-----------|-------------|
| `listTestCycles` | List test cycles in a project |
| `createTestCycle` | Create a new test cycle |
| `getTestCycle` | Get details of a specific test cycle |
| `updateTestCycle` | Update an existing test cycle |
| `createTestCycleWebLink` | Create a web link for a test cycle |
| `createTestCycleIssueLink` | Create an issue link for a test cycle |

### Test Executions

| Tool Name | Description |
|-----------|-------------|
| `listTestExecutions` | List test executions in a project |
| `createTestExecution` | Create a new test execution |
| `getTestExecution` | Get details of a specific test execution |
| `createTestExecutionIssueLink` | Create an issue link for a test execution |

### Statuses

| Tool Name | Description |
|-----------|-------------|
| `listStatuses` | List statuses |
| `createStatus` | Create a new status |
| `getStatus` | Get details of a specific status |

### Priorities

| Tool Name | Description |
|-----------|-------------|
| `listPriorities` | List priorities (read-only) |

### Environments

| Tool Name | Description |
|-----------|-------------|
| `listEnvironments` | List environments (read-only) |

### Links

| Tool Name | Description |
|-----------|-------------|
| `deleteLink` | Delete a link |

## Development

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Format code
npm run format

# Lint code
npm run lint
```

### Required Environment Variables

- `ZEPHYR_API_TOKEN`: Your Zephyr Scale API token
- `JIRA_PROJECT_KEY`: Your Jira project key (e.g., "KAN")

### How to Get Your Zephyr API Token

1. In Jira, click your profile picture
2. Select "Zephyr API keys"
3. Generate a new API key

For more information, see the [Zephyr Scale documentation](https://support.smartbear.com/zephyr-scale-cloud/docs/en/rest-api/api-access-tokens-management.html).

### Testing Local Build

Add the following configuration to your `.mcp.json`:

```json
{
  "mcpServers": {
    "zephyr-scale": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-zephyr-scale/dist/index.js"],
      "env": {
        "ZEPHYR_API_TOKEN": "your-api-token-here",
        "JIRA_PROJECT_KEY": "YOUR_PROJECT"
      }
    }
  }
}
```

Replace `/absolute/path/to/mcp-zephyr-scale` with the actual absolute path to your local repository.

### Using with Atlassian (JIRA) MCP Server

Since Zephyr Scale is a Jira plugin, it's recommended to use the official Atlassian MCP Server alongside this Zephyr Scale MCP Server. This allows you to access both JIRA and Zephyr Scale functionality without duplicating JIRA-related features.

Add the Atlassian MCP Server to your `.mcp.json`:

```json
{
  "mcpServers": {
    "zephyr-scale": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-zephyr-scale/dist/index.js"],
      "env": {
        "ZEPHYR_API_TOKEN": "your-api-token-here",
        "JIRA_PROJECT_KEY": "YOUR_PROJECT"
      }
    },
    "atlassian": {
      "url": "https://mcp.atlassian.com/v1/sse"
    }
  }
}
```

#### Initial Authentication

When you first add the Atlassian MCP Server:
1. The server will prompt you to authorize access via OAuth
2. You'll be redirected to Atlassian to complete authentication
3. Select which products to allow access (Jira and/or Confluence)
4. Click "Approve" to complete the authentication

#### Reauthentication

If your authentication expires, you can reconnect using:
- **Claude Code**: Run the `/mcp` command to manage MCP server connections and select "Reconnect" for the Atlassian server

## License

MIT
