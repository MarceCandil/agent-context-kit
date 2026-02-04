import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

export function read(p: string): string {
  return fs.readFileSync(path.join(ROOT, p), "utf8");
}

export function write(p: string, content: string): void {
  const abs = path.join(ROOT, p);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
}

export function listMd(dir: string): string[] {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(dir, f).replaceAll("\\", "/"));
}

/**
 * List skills from a directory, supporting both:
 * - File-based skills: skill-name.md
 * - Directory-based skills: skill-name/SKILL.md
 *
 * Returns array of { name, path } where path points to the skill content file.
 */
export function listSkills(dir: string): Array<{ name: string; path: string }> {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];

  const skills: Array<{ name: string; path: string }> = [];

  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    // Skip README.md
    if (entry.name === "README.md") continue;

    if (entry.isDirectory()) {
      // Directory-based skill: look for SKILL.md inside
      const skillMdPath = path.join(dir, entry.name, "SKILL.md");
      if (fs.existsSync(path.join(ROOT, skillMdPath))) {
        skills.push({ name: entry.name, path: skillMdPath });
      }
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      // File-based skill: skill-name.md
      skills.push({
        name: path.basename(entry.name, ".md"),
        path: path.join(dir, entry.name).replaceAll("\\", "/")
      });
    }
  }

  return skills;
}

export function clampFileSizeByChunks(
  chunks: Array<{ filename: string; content: string }>,
  maxChars: number
): Array<{ filename: string; content: string }> {
  for (const c of chunks) {
    if (c.content.length > maxChars) {
      throw new Error(
        `Chunk ${c.filename} exceeds ${maxChars} chars (${c.content.length}). Split it.`
      );
    }
  }
  return chunks;
}

export function joinSections(sections: Array<{ title: string; body: string }>): string {
  return sections
    .map((s) => `\n\n---\n\n## ${s.title}\n\n${s.body.trim()}\n`)
    .join("")
    .trim() + "\n";
}
