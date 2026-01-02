/**
 * Generate OpenCode config (uses JSON configuration).
 */
export function generateOpenCodeFiles(): Array<{ filename: string; content: string }> {
  const config = {
    $schema: "https://opencode.ai/config.json",
    instructions: [
      "ai/AI.md",
      "ai/constitution.md",
      "ai/roles/*.md",
      "ai/skills/*.md",
      "ai/workflows/*.md",
    ],
  };

  return [
    {
      filename: "opencode.json",
      content: JSON.stringify(config, null, 2) + "\n",
    },
  ];
}
