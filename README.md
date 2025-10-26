# Zephyr Scale MCP Server

MCP Server for Zephyr Scale test management tool.

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

## License

MIT
