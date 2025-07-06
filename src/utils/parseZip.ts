import { BlobReader, ZipReader, TextWriter} from "@zip.js/zip.js";

export interface ParsedFile {
  path: string;
  content: string;
}

export async function parseZipFile(file: File): Promise<ParsedFile[]> {
  const zipReader = new ZipReader(new BlobReader(file));
  const entries = await zipReader.getEntries();

  const parsedFiles: ParsedFile[] = [];

  for (const entry of entries) {
    if (!entry.directory && isTextFile(entry.filename)) {
      const text = await entry.getData?.(new TextWriter());
      parsedFiles.push({
        path: entry.filename,
        content: text,
      });
    }
  }

  await zipReader.close();
  return parsedFiles;
}

function isTextFile(filename: string): boolean {
  return /\.(ts|tsx|js|jsx|md|json|html|css|txt)$/i.test(filename);
}
