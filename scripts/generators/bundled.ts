import type { Section } from "../types";

function banner(title: string): string {
  return `<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->\n\n# ${title}\n`;
}

function joinSections(sections: Section[]): string {
  return sections
    .map((s) => `\n\n---\n\n## ${s.title}\n\n${s.body.trim()}\n`)
    .join("")
    .trim() + "\n";
}

/**
 * Generate bundled files for IDEs that don't support imports.
 * Used by: GitHub Copilot, Kilo Code, Augment, Amazon Q, CodeBuddy, Qoder, SHAI, Cline
 */
export function generateBundledFiles(
  agents: string,
  aiMap: string,
  constitution: string,
  roles: Section[]
): Array<{ filename: string; content: string }> {
  const bundle = [
    { title: "AGENTS", body: agents },
    { title: "AI Map", body: aiMap },
    { title: "Constitution", body: constitution },
    ...roles.map((r) => ({ title: `Role: ${r.title}`, body: r.body })),
  ];

  const bundledContent = joinSections(bundle);

  return [
    // GitHub Copilot
    {
      filename: ".github/copilot-instructions.md",
      content: banner("Copilot Instructions") + bundledContent,
    },
    // Kilo Code
    {
      filename: ".kilocode/rules/00-global.md",
      content: banner("Kilo Code Rules") + bundledContent,
    },
    // Augment (with frontmatter)
    {
      filename: ".augment/rules/00-global.md",
      content: `---\ntype: always_apply\n---\n\n${banner("Auggie (Augment) Rules")}\n${bundledContent}`,
    },
    // Amazon Q Developer
    {
      filename: ".amazonq/rules/00-global.md",
      content: banner("Amazon Q Developer Project Rules") + bundledContent,
    },
    // CodeBuddy (Tencent)
    {
      filename: "CODEBUDDY.md",
      content: banner("CodeBuddy Instructions") + bundledContent,
    },
    // Qoder
    {
      filename: ".qoder/rules/00-global.md",
      content: banner("Qoder Rules") + bundledContent,
    },
    // SHAI
    {
      filename: "SHAI.md",
      content: banner("SHAI Project Context") + bundledContent,
    },
    // Roo Code / Cline
    {
      filename: ".clinerules",
      content: banner("Roo Code / Cline Rules") + bundledContent,
    },
  ];
}
