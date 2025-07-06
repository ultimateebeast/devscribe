import { OpenAI } from "openai";
import { ParsedFile } from "./parseZip";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ Must be set in `.env.local`
  dangerouslyAllowBrowser: true, // Only for local/dev
});

export async function generateReadme(files: ParsedFile[]): Promise<string> {
  const topFiles = files.filter((f) =>
    /readme|package\.json|index|main|app/i.test(f.path)
  );

  const contextText = topFiles
    .map((f) => `---\nFILE: ${f.path}\n${f.content.slice(0, 1500)}`)
    .join("\n\n");

  const prompt = `
You are a skilled open-source assistant. Based on the following code files, generate a professional and helpful README.md for this project.
It should include:
1. Project name and one-liner description
2. Installation instructions
3. Usage example
4. Features
5. Tech stack
6. Contribution guidelines (basic)
7. License placeholder

Code Context:
${contextText}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content || "README generation failed.";
}
