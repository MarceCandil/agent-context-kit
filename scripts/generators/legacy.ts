/**
 * Generate legacy pointer files.
 */
export function generateLegacyFiles(): Array<{ filename: string; content: string }> {
  return [
    {
      filename: ".cursorrules",
      content:
        "# Cursor Rules (legacy)\n# Read ai/AI.md before doing anything.\n# For detailed rules, see .cursor/rules/\n",
    },
  ];
}
