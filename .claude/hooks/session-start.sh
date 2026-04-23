#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Ensure .mcp.json exists (it's gitignored because it can contain tokens)
if [ ! -f .mcp.json ] && [ -f .mcp.json.example ]; then
  cp .mcp.json.example .mcp.json
fi

# Ensure uv/uvx is available for markitdown-mcp
if ! command -v uvx &> /dev/null; then
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
  echo "export PATH=\"\$HOME/.local/bin:\$PATH\"" >> "$CLAUDE_ENV_FILE"
fi
