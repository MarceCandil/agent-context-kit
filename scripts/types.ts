export interface Section {
  title: string;
  body: string;
}

export interface FileToWrite {
  filename: string;
  content: string;
}

export interface SkillMetadata {
  name: string;
  description: string;
  license?: string;
  compatibility?: string;
}
