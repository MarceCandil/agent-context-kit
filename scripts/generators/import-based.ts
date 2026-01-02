/**
 * Generate import-based files for IDEs that support @imports.
 * Used by: Gemini CLI, Qwen Code
 */
export function generateImportBasedFiles(roleFiles: string[]): Array<{ filename: string; content: string }> {
  const banner = (title: string) =>
    `<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->\n\n# ${title}\n`;

  const imports = [
    "@./AGENTS.md",
    "@./ai/AI.md",
    "@./ai/constitution.md",
    ...roleFiles.map((p) => `@./${p}`),
  ].join("\n");

  return [
    // Gemini CLI
    {
      filename: "GEMINI.md",
      content: banner("Gemini CLI Instructions") + `\n${imports}\n`,
    },
    // Qwen Code
    {
      filename: "QWEN.md",
      content: banner("Qwen Code Context") + `\n${imports}\n`,
    },
  ];
}
