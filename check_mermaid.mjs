import mermaid from 'mermaid';
import fs from 'fs';
import path from 'path';

const files = [
  'architecture.md',
  'components.md',
  'database.md',
  'features.md'
];

async function checkDiagrams() {
  let hasError = false;
  mermaid.initialize({ startOnLoad: false });
  for (const file of files) {
    const content = fs.readFileSync(path.join('c:/Users/ASUS/Desktop/projects/docs/verto', file), 'utf-8');
    const regex = /```mermaid\n([\s\S]*?)```/g;
    let match;
    let count = 0;
    while ((match = regex.exec(content)) !== null) {
      count++;
      const diagram = match[1];
      try {
        await mermaid.parse(diagram);
        console.log(`[OK] ${file} - diagram ${count}`);
      } catch (err) {
        console.error(`[ERROR] ${file} - diagram ${count}`);
        console.error(err.message);
        hasError = true;
      }
    }
  }
  if (!hasError) console.log("All diagrams parsed successfully.");
}

checkDiagrams();
