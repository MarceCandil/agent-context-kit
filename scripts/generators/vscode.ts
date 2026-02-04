import type { Section, SkillMetadata } from "../types";

/**
 * Transform references from ai/* to .github/* for VS Code/GitHub Copilot.
 */
export function transformReferencesForVSCode(content: string): string {
  return content
    // Skills references (native skills in .github/skills/)
    .replace(/`ai\/skills\/\*`/g, '`.github/skills/`')
    .replace(/`ai\/skills\/([a-z-]+)\.md`/g, '`.github/skills/$1/SKILL.md`')
    .replace(/@ai\/skills\/([a-z-]+)\.md/g, '@.github/skills/$1/SKILL.md')

    // Other ai/* references remain as-is since VS Code doesn't have equivalents
    // for rules, workflows, etc. - just skills
    ;
}

/**
 * Skill metadata for native VS Code/GitHub Copilot SKILL.md files.
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
};

/**
 * Generate native VS Code/GitHub Copilot SKILL.md file content.
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
 * Generate VS Code/GitHub Copilot native skills.
 * VS Code uses .github/skills/<name>/SKILL.md for the agentskills.io standard.
 *
 * Note: VS Code doesn't have a rules/instructions file equivalent like Cursor/Windsurf.
 * For project-level instructions, users should use .github/copilot-instructions.md
 * which is not generated here (it's a different format).
 */
export function generateVSCodeFiles(
  skills: Section[]
): Array<{ filename: string; content: string }> {
  const files: Array<{ filename: string; content: string }> = [];

  // Native skills (.github/skills/<name>/SKILL.md)
  // GitHub Copilot in VS Code supports the agentskills.io standard
  for (const skill of skills) {
    files.push({
      filename: `.github/skills/${skill.title}/SKILL.md`,
      content: generateSkillMd(skill.title, transformReferencesForVSCode(skill.body)),
    });
  }

  return files;
}
