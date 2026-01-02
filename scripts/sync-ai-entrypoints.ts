import path from "node:path";
import { read, write, listMd, clampFileSizeByChunks, joinSections } from "./utils";
import { generateWindsurfFiles } from "./generators/windsurf";
import { generateCursorFiles } from "./generators/cursor";
import { generateClaudeFiles } from "./generators/claude";
import { generateBundledFiles } from "./generators/bundled";
import { generateImportBasedFiles } from "./generators/import-based";
import { generateOpenCodeFiles } from "./generators/opencode";
import { generateLegacyFiles } from "./generators/legacy";
import type { Section } from "./types";

function main() {
  const agents = read("AGENTS.md");
  const aiMap = read("ai/AI.md");
  const constitution = read("ai/constitution.md");

  const roleFiles = [
    "ai/roles/tech-lead.md",
    "ai/roles/dev.md",
    "ai/roles/qa.md",
    "ai/roles/devops.md",
  ];
  const roles: Section[] = roleFiles.map((p) => ({
    title: path.basename(p, ".md"),
    body: read(p)
  }));

  const skillFiles = listMd("ai/skills");
  const skills: Section[] = skillFiles.map((p) => ({
    title: path.basename(p, ".md"),
    body: read(p)
  }));

  const workflowFiles = listMd("ai/workflows");

  // Generate files for each IDE
  const allFiles = [
    ...generateClaudeFiles(roleFiles),
    ...generateCursorFiles(agents, aiMap, constitution, roles),
    ...generateWindsurfFiles(agents, constitution, aiMap, roles, skills, workflowFiles, joinSections, read),
    ...generateBundledFiles(agents, aiMap, constitution, roles),
    ...generateImportBasedFiles(roleFiles),
    ...generateOpenCodeFiles(),
    ...generateLegacyFiles(),
  ];

  // Validate Windsurf files don't exceed 12000 char limit
  const windsurfFiles = allFiles.filter((f) => f.filename.startsWith(".windsurf/"));
  clampFileSizeByChunks(windsurfFiles, 12000);

  for (const file of allFiles) {
    write(file.filename, file.content);
  }

  console.log("sync-ai-entrypoints: done");
}

main();
