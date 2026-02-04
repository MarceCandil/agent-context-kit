import type { Section, SkillMetadata } from "../types";

function joinSections(sections: Section[]): string {
  return sections
    .map((s) => `\n\n---\n\n## ${s.title}\n\n${s.body.trim()}\n`)
    .join("")
    .trim() + "\n";
}

/**
 * Transform references from ai/* to .cursor/* for self-contained Cursor folder.
 */
export function transformReferencesForCursor(content: string): string {
  return content
    // AI.md references
    .replace(/`ai\/AI\.md`/g, '`.cursor/rules/30-map.mdc`')
    .replace(/@ai\/AI\.md/g, '@.cursor/rules/30-map.mdc')

    // Constitution references
    .replace(/`ai\/constitution\.md`/g, '`.cursor/rules/10-constitution.mdc`')
    .replace(/@ai\/constitution\.md/g, '@.cursor/rules/10-constitution.mdc')

    // Workflow references (Cursor doesn't have native workflows, point to ai/)
    .replace(/`ai\/workflows\/([a-z-]+\.md)`/g, '`ai/workflows/$1`')
    .replace(/@ai\/workflows\/([a-z-]+\.md)/g, '@ai/workflows/$1')

    // Role references (all bundled in 20-roles.mdc)
    .replace(/`ai\/roles\/tech-lead\.md`/g, '`.cursor/rules/20-roles.mdc` (tech-lead section)')
    .replace(/`ai\/roles\/dev\.md`/g, '`.cursor/rules/20-roles.mdc` (dev section)')
    .replace(/`ai\/roles\/qa\.md`/g, '`.cursor/rules/20-roles.mdc` (qa section)')
    .replace(/`ai\/roles\/devops\.md`/g, '`.cursor/rules/20-roles.mdc` (devops section)')

    // Skills references (native skills in .cursor/skills/)
    .replace(/`ai\/skills\/\*`/g, '`.cursor/skills/`')
    .replace(/`ai\/skills\/([a-z-]+)\.md`/g, '`.cursor/skills/$1/SKILL.md`')

    // AGENTS.md reference
    .replace(/`AGENTS\.md`/g, '`.cursor/rules/00-agents.mdc`')
    .replace(/@AGENTS\.md/g, '@.cursor/rules/00-agents.mdc');
}

function cursorFrontmatter(description: string, alwaysApply = true): string {
  return `---
description: "${description}"
globs:
  - "**/*"
alwaysApply: ${alwaysApply}
---

`;
}

function banner(title: string): string {
  return `<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->\n\n# ${title}\n`;
}

/**
 * Skill metadata for native Cursor SKILL.md files.
 * Per agentskills.io spec: name and description required, license and compatibility optional.
 */
const skillMetadata: Record<string, SkillMetadata> = {
  db: {
    name: "db",
    description: "Database schema changes and migration workflows. Use when creating, modifying, or rolling back migrations.",
  },
  git: {
    name: "git",
    description: "Git workflows and PR hygiene. Use when creating branches, commits, or preparing pull requests.",
  },
  test: {
    name: "test",
    description: "Testing strategy and best practices. Use when writing tests or deciding test coverage.",
  },
  "review-checklist": {
    name: "review-checklist",
    description: "Code review guidelines. Use when reviewing pull requests or ensuring quality standards.",
  },
  security: {
    name: "security",
    description: "Security best practices. Use when handling auth, secrets, input validation, or API security.",
  },
  "react-best-practices": {
    name: "react-best-practices",
    description: "React and Next.js performance optimization. Use when writing or reviewing React/Next.js code.",
    license: "MIT",
    compatibility: "Next.js 13+ with App Router",
  },
};

/**
 * Generate native Cursor SKILL.md file content.
 * Follows agentskills.io spec with optional license and compatibility fields.
 */
function generateSkillMd(skillName: string, skillBody: string): string {
  const meta = skillMetadata[skillName] || { name: skillName, description: `Skill for ${skillName}` };

  let frontmatter = `---
name: ${meta.name}
description: ${meta.description}`;

  if (meta.license) {
    frontmatter += `\nlicense: ${meta.license}`;
  }
  if (meta.compatibility) {
    frontmatter += `\ncompatibility: ${meta.compatibility}`;
  }

  frontmatter += `\n---`;

  return `${frontmatter}

<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/skills/${skillName}.md -->

${skillBody}
`;
}

/**
 * Generate Cursor rules (.mdc format) and native skills.
 * Cursor 2.4+ supports native skills via .cursor/skills/<name>/SKILL.md
 */
export function generateCursorFiles(
  agents: string,
  aiMap: string,
  constitution: string,
  roles: Section[],
  skills: Section[] = []
): Array<{ filename: string; content: string }> {
  const files: Array<{ filename: string; content: string }> = [];

  // Rules (.mdc format, split by concern)
  files.push(
    {
      filename: ".cursor/rules/00-agents.mdc",
      content: cursorFrontmatter("Project setup, commands, and how to work in this repo") +
        banner("AGENTS (Cursor)") +
        transformReferencesForCursor(agents) + "\n",
    },
    {
      filename: ".cursor/rules/10-constitution.mdc",
      content: cursorFrontmatter("Quality gates, safety rules, and engineering constraints") +
        banner("Constitution (Cursor)") +
        transformReferencesForCursor(constitution) + "\n",
    },
    {
      filename: ".cursor/rules/20-roles.mdc",
      content: cursorFrontmatter("Role definitions for Tech Lead, Dev, QA, and DevOps") +
        banner("Roles (Cursor)") +
        transformReferencesForCursor(joinSections(roles.map((r) => ({ title: r.title, body: r.body })))),
    },
    {
      filename: ".cursor/rules/30-map.mdc",
      content: cursorFrontmatter("AI Hub - entry point and project map") +
        banner("AI Map (Cursor)") +
        transformReferencesForCursor(aiMap) + "\n",
    }
  );

  // Native skills (.cursor/skills/<name>/SKILL.md)
  // Cursor 2.4+ supports the agentskills.io standard
  for (const skill of skills) {
    files.push({
      filename: `.cursor/skills/${skill.title}/SKILL.md`,
      content: generateSkillMd(skill.title, transformReferencesForCursor(skill.body)),
    });
  }

  return files;
}
