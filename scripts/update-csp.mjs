import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const headersPath = join(distDirectory, '_headers');

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectHtmlFiles(entryPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(entryPath);
    }
  }

  return files;
}

function isExecutableInlineScript(attributes, content) {
  if (!content || /\bsrc\s*=/i.test(attributes)) {
    return false;
  }

  const typeMatch = attributes.match(
    /\btype\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/i,
  );
  const type = (typeMatch?.[1] ?? typeMatch?.[2] ?? typeMatch?.[3] ?? '')
    .toLowerCase();

  return ![
    'application/json',
    'application/ld+json',
    'speculationrules',
  ].includes(type);
}

const hashes = new Set();
const htmlFiles = await collectHtmlFiles(distDirectory);
const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8');

  for (const match of html.matchAll(scriptPattern)) {
    const [, attributes, content] = match;

    if (!isExecutableInlineScript(attributes, content)) {
      continue;
    }

    const digest = createHash('sha256').update(content, 'utf8').digest('base64');
    hashes.add(`'sha256-${digest}'`);
  }
}

if (hashes.size === 0) {
  throw new Error('No executable inline scripts found; refusing to rewrite CSP.');
}

const headers = await readFile(headersPath, 'utf8');
const scriptSourcePattern = /^(\s*Content-Security-Policy:.*?script-src\s+'self')(?:\s+'sha256-[^']+')*(\s+https:\/\/static\.cloudflareinsights\.com;.*)$/m;

if (!scriptSourcePattern.test(headers)) {
  throw new Error('Could not locate the script-src hash section in dist/_headers.');
}

const hashDirectives = [...hashes].sort().join(' ');
const updatedHeaders = headers.replace(
  scriptSourcePattern,
  (_, prefix, suffix) => `${prefix} ${hashDirectives}${suffix}`,
);

await writeFile(headersPath, updatedHeaders, 'utf8');
console.log(`Updated CSP with ${hashes.size} inline script hashes.`);
