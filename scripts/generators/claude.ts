/**
 * Generate Claude Code entrypoint (uses @imports).
 */
export function generateClaudeFiles(roleFiles: string[]): Array<{ filename: string; content: string }> {
  const banner = `<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->\n\n# Claude Code Instructions\n`;

  const claudeImports = [
    "@AGENTS.md",
    "@ai/AI.md",
    "@ai/constitution.md",
    ...roleFiles.map((p) => `@${p}`),
  ].join("\n");

  return [
    {
      filename: "CLAUDE.md",
      content: banner + `\n${claudeImports}\n`,
    },
  ];
}
