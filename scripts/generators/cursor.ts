import type { Section } from "../types";

function joinSections(sections: Section[]): string {
  return sections
    .map((s) => `\n\n---\n\n## ${s.title}\n\n${s.body.trim()}\n`)
    .join("")
    .trim() + "\n";
}

/**
 * Generate Cursor rules (.mdc format).
 */
export function generateCursorFiles(
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

  const cursorMdc = `---
description: "Global project guidance (generated)"
globs:
  - "**/*"
alwaysApply: true
---

${joinSections(bundle)}
`;

  return [
    {
      filename: ".cursor/rules/00-global.mdc",
      content: cursorMdc,
    },
  ];
}
