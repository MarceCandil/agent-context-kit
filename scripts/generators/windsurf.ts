import type { Section } from "../types";

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

    // Skills references (bundled in 40-skills.md)
    .replace(/`ai\/skills\/\*`/g, '`.windsurf/rules/40-skills.md`')
    .replace(/`ai\/skills\/([a-z-]+\.md)`/g, '`.windsurf/rules/40-skills.md` ($1 section)')

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
 * Generate Windsurf rules and workflows.
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
    },
    {
      filename: ".windsurf/rules/40-skills.md",
      content: windsurfFrontmatter("Reusable knowledge: database, git, testing, review checklist") +
        banner("Skills (Windsurf)") +
        transformReferencesForWindsurf(joinSections(skills.map((s) => ({ title: `Skill: ${s.title}`, body: s.body })))),
    }
  );

  // Workflows (copy from ai/workflows -> .windsurf/workflows)
  for (const workflowPath of workflows) {
    files.push({
      filename: `.windsurf/workflows/${workflowPath.split('/').pop()}`,
      content: readFile(workflowPath),
    });
  }

  return files;
}
