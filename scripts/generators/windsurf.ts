import type { Section, SkillMetadata } from "../types";

/**
 * Transform references from ai/* to .windsurf/* for self-contained Windsurf folder.
 * This ensures .windsurf/ can be copied standalone without external dependencies.
 */
export function transformReferencesForWindsurf(content: string): string {
  return content
    // AI.md references
    .replace(/`ai\/AI\.md`/g, '`.windsurf/rules/30-map.md`')
    .replace(/@ai\/AI\.md/g, '@.windsurf/rules/30-map.md')

    // Constitution references
    .replace(/`ai\/constitution\.md`/g, '`.windsurf/rules/10-constitution.md`')
    .replace(/@ai\/constitution\.md/g, '@.windsurf/rules/10-constitution.md')

    // Workflow references (generic pattern)
    .replace(/`ai\/workflows\/([a-z-]+\.md)`/g, '`.windsurf/workflows/$1`')
    .replace(/@ai\/workflows\/([a-z-]+\.md)/g, '@.windsurf/workflows/$1')

    // Role references (all bundled in 20-roles.md)
    .replace(/`ai\/roles\/tech-lead\.md`/g, '`.windsurf/rules/20-roles.md` (tech-lead section)')
    .replace(/`ai\/roles\/dev\.md`/g, '`.windsurf/rules/20-roles.md` (dev section)')
    .replace(/`ai\/roles\/qa\.md`/g, '`.windsurf/rules/20-roles.md` (qa section)')
    .replace(/`ai\/roles\/devops\.md`/g, '`.windsurf/rules/20-roles.md` (devops section)')

    // Skills references (native skills in .windsurf/skills/)
    .replace(/`ai\/skills\/\*`/g, '`.windsurf/skills/`')
    .replace(/`ai\/skills\/([a-z-]+)\.md`/g, '`.windsurf/skills/$1/SKILL.md`')

    // AGENTS.md reference
    .replace(/`AGENTS\.md`/g, '`.windsurf/rules/00-agents.md`')
    .replace(/@AGENTS\.md/g, '@.windsurf/rules/00-agents.md');
}

function windsurfFrontmatter(description: string, alwaysApply = true): string {
  return `---
description: "${description}"
alwaysApply: ${alwaysApply}
---

`;
}

function banner(title: string): string {
  return `<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->\n\n# ${title}\n`;
}

/**
 * Skill metadata for native Windsurf SKILL.md files.
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
  "react-best-practices": {
    name: "react-best-practices",
    description: "React and Next.js performance optimization. Use when writing or reviewing React/Next.js code.",
    license: "MIT",
    compatibility: "Next.js 13+ with App Router",
  },
};

/**
 * Generate native Windsurf SKILL.md file content.
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
 * Generate Windsurf rules, workflows, and native skills.
 * Returns array of files to write.
 */
export function generateWindsurfFiles(
  agents: string,
  constitution: string,
  aiMap: string,
  roles: Section[],
  skills: Section[],
  workflows: string[],
  joinSections: (sections: Section[]) => string,
  readFile: (path: string) => string
): Array<{ filename: string; content: string }> {
  const files: Array<{ filename: string; content: string }> = [];

  // Rules (max 12000 chars per file)
  files.push(
    {
      filename: ".windsurf/rules/00-agents.md",
      content: windsurfFrontmatter("Project setup, commands, and how to work in this repo") +
        banner("AGENTS (Windsurf)") +
        transformReferencesForWindsurf(agents) + "\n",
    },
    {
      filename: ".windsurf/rules/10-constitution.md",
      content: windsurfFrontmatter("Quality gates, safety rules, and engineering constraints") +
        banner("Constitution (Windsurf)") +
        transformReferencesForWindsurf(constitution) + "\n",
    },
    {
      filename: ".windsurf/rules/20-roles.md",
      content: windsurfFrontmatter("Role definitions for Tech Lead, Dev, QA, and DevOps") +
        banner("Roles (Windsurf)") +
        transformReferencesForWindsurf(joinSections(roles.map((r) => ({ title: r.title, body: r.body })))),
    },
    {
      filename: ".windsurf/rules/30-map.md",
      content: windsurfFrontmatter("AI Hub - entry point and project map") +
        banner("AI Map (Windsurf)") +
        transformReferencesForWindsurf(aiMap) + "\n",
    }
  );

  // Workflows (copy from ai/workflows -> .windsurf/workflows)
  for (const workflowPath of workflows) {
    files.push({
      filename: `.windsurf/workflows/${workflowPath.split('/').pop()}`,
      content: readFile(workflowPath),
    });
  }

  // Native skills (.windsurf/skills/<name>/SKILL.md)
  for (const skill of skills) {
    files.push({
      filename: `.windsurf/skills/${skill.title}/SKILL.md`,
      content: generateSkillMd(skill.title, transformReferencesForWindsurf(skill.body)),
    });
  }

  return files;
}
