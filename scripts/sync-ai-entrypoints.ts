import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function read(p: string) {
  return fs.readFileSync(path.join(ROOT, p), "utf8");
}

function write(p: string, content: string) {
  const abs = path.join(ROOT, p);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
}

function listMd(dir: string) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(dir, f).replaceAll("\\", "/"));
}

function banner(title: string) {
  return `<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->\n\n# ${title}\n`;
}

function windsurfFrontmatter(description: string, alwaysApply = true) {
  return `---
description: "${description}"
alwaysApply: ${alwaysApply}
---

`;
}


function joinSections(sections: Array<{ title: string; body: string }>) {
  return sections
    .map((s) => `\n\n---\n\n## ${s.title}\n\n${s.body.trim()}\n`)
    .join("")
    .trim() + "\n";
}

function clampFileSizeByChunks(
  chunks: Array<{ filename: string; content: string }>,
  maxChars: number
) {
  for (const c of chunks) {
    if (c.content.length > maxChars) {
      throw new Error(
        `Chunk ${c.filename} exceeds ${maxChars} chars (${c.content.length}). Split it.`
      );
    }
  }
  return chunks;
}

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
  const roles = roleFiles.map((p) => ({ title: path.basename(p, ".md"), body: read(p) }));

  const bundle = [
    { title: "AGENTS", body: agents },
    { title: "AI Map", body: aiMap },
    { title: "Constitution", body: constitution },
    ...roles.map((r) => ({ title: `Role: ${r.title}`, body: r.body })),
  ];

  // Claude Code entrypoint
  const claudeImports = [
    "@AGENTS.md",
    "@ai/AI.md",
    "@ai/constitution.md",
    ...roleFiles.map((p) => `@${p}`),
  ].join("\n");
  write("CLAUDE.md", banner("Claude Code Instructions") + `\n${claudeImports}\n`);

  // GitHub Copilot entrypoint
  write(".github/copilot-instructions.md", banner("Copilot Instructions") + joinSections(bundle));

  // Windsurf Rules + Workflows
  // Rules live in .windsurf/rules; keep each file under 12000 chars as per docs.
  const windsurfRuleChunks = clampFileSizeByChunks(
    [
      {
        filename: ".windsurf/rules/00-agents.md",
        content: windsurfFrontmatter("Project setup, commands, and how to work in this repo") + banner("AGENTS (Windsurf)") + agents + "\n",
      },
      {
        filename: ".windsurf/rules/10-constitution.md",
        content: windsurfFrontmatter("Quality gates, safety rules, and engineering constraints") + banner("Constitution (Windsurf)") + constitution + "\n",
      },
      {
        filename: ".windsurf/rules/20-roles.md",
        content: windsurfFrontmatter("Role definitions for Tech Lead, Dev, QA, and DevOps") +
          banner("Roles (Windsurf)") +
          joinSections(roles.map((r) => ({ title: r.title, body: r.body }))),
      },
      {
        filename: ".windsurf/rules/30-map.md",
        content: windsurfFrontmatter("AI Hub - entry point and project map") + banner("AI Map (Windsurf)") + aiMap + "\n",
      },
    ],
    12000
  );

  for (const c of windsurfRuleChunks) write(c.filename, c.content);

  // Workflows: copy from ai/workflows -> .windsurf/workflows
  const wf = listMd("ai/workflows");
  const windsurfWorkflowChunks = clampFileSizeByChunks(
    wf.map((p) => ({
      filename: `.windsurf/workflows/${path.basename(p)}`,
      content: read(p),
    })),
    12000
  );
  for (const c of windsurfWorkflowChunks) write(c.filename, c.content);

  // Cursor rules (.mdc). Keep one alwaysApply global rule.
  const cursorMdc = `---
description: "Global project guidance (generated)"
globs:
  - "**/*"
alwaysApply: true
---

${joinSections(bundle)}
`;
  write(".cursor/rules/00-global.mdc", cursorMdc);

  // Gemini CLI entrypoint
  write(
    "GEMINI.md",
    banner("Gemini CLI Instructions") +
      "\n@./AGENTS.md\n@./ai/AI.md\n@./ai/constitution.md\n@./ai/roles/tech-lead.md\n@./ai/roles/dev.md\n@./ai/roles/qa.md\n@./ai/roles/devops.md\n"
  );

  // Qwen Code entrypoint
  write(
    "QWEN.md",
    banner("Qwen Code Context") +
      "\n@./AGENTS.md\n@./ai/AI.md\n@./ai/constitution.md\n@./ai/roles/tech-lead.md\n@./ai/roles/dev.md\n@./ai/roles/qa.md\n@./ai/roles/devops.md\n"
  );

  // OpenCode config
  write(
    "opencode.json",
    JSON.stringify(
      {
        $schema: "https://opencode.ai/config.json",
        instructions: [
          "ai/AI.md",
          "ai/constitution.md",
          "ai/roles/*.md",
          "ai/skills/*.md",
          "ai/workflows/*.md",
        ],
      },
      null,
      2
    ) + "\n"
  );

  // Kilo Code custom rules
  write(".kilocode/rules/00-global.md", banner("Kilo Code Rules") + joinSections(bundle));

  // Auggie (Auggie CLI / Augment) rules
  write(
    ".augment/rules/00-global.md",
    `---\ntype: always_apply\n---\n\n${banner("Auggie (Augment) Rules")}\n${joinSections(
      bundle
    )}`
  );

  // Amazon Q Developer project rules (IDE chat)
  write(".amazonq/rules/00-global.md", banner("Amazon Q Developer Project Rules") + joinSections(bundle));

  // CodeBuddy (Tencent) context file
  write("CODEBUDDY.md", banner("CodeBuddy Instructions") + joinSections(bundle));

  // Qoder project rules
  write(".qoder/rules/00-global.md", banner("Qoder Rules") + joinSections(bundle));

  // SHAI project context file
  write("SHAI.md", banner("SHAI Project Context") + joinSections(bundle));

  // Other entrypoints (generated bundle or legacy pointers)
  const pointers: Array<{ filename: string; content: string }> = [
    {
      filename: ".clinerules",
      content: banner("Roo Code / Cline Rules") + joinSections(bundle),
    },
    {
      filename: ".cursorrules",
      content:
        "# Cursor Rules (legacy)\n# Read ai/AI.md before doing anything.\n# For detailed rules, see .cursor/rules/\n",
    },
  ];
  for (const p of pointers) write(p.filename, p.content);

  console.log("sync-ai-entrypoints: done");
}

main();
