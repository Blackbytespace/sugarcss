import { packageRootDir } from '@blackbyte/sugar/package';
import fs from 'fs';
import path from 'path';

// Collect the raw contents of every first-party CSS file that defines sugarcss
// custom properties (`--s-*: ...`), so they can be replayed through the
// declaration visitors BEFORE any component CSS is compiled.
//
// sugarcss resolves build-time at-rules (`@media md`, `@container`, grids) and
// `s-responsive()` from the module-level `env` singleton, which is only filled
// while transforming the file that declares `--s-media-*` etc. Because
// lightningcss transforms each css file independently, in no guaranteed order,
// and does not follow `@import`, a component file can be compiled before the
// settings file that defines those values. Running the declaration visitors
// over these files up front makes the env deterministic and order-independent.

let scanned = false;
let cachedFiles: string[] = [];

const IGNORED_DIRS = new Set([
  'node_modules',
  '.nuxt',
  '.output',
  'dist',
  '.git',
  '.cache',
  '.turbo',
  'build',
  'coverage',
]);

// Matches a `--s-*` custom-property DECLARATION (a name followed by a colon),
// not a `var(--s-*)` usage (which is followed by `)` or `,`).
const SETTINGS_DECLARATION_REGEX = /--s-[\w-]+\s*:/;

function collectCssFiles(dir: string, files: string[]): void {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    return;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name) || entry.name.startsWith('.')) {
        continue;
      }
      const childDir = path.join(dir, entry.name);
      // stop at nested package boundaries (vendored deps, sub-packages,
      // scaffolding templates): the active project's settings never live
      // inside one, and their values would conflict with the real config.
      if (fs.existsSync(path.join(childDir, 'package.json'))) {
        continue;
      }
      collectCssFiles(childDir, files);
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      files.push(path.join(dir, entry.name));
    }
  }
}

// Returns the raw contents of the project's sugarcss settings CSS files.
// Memoized: the filesystem scan runs only once per process.
export function collectSettingsCss(): string[] {
  if (scanned) {
    return cachedFiles;
  }
  scanned = true;

  try {
    const root = packageRootDir(process.cwd()) || process.cwd();
    const files: string[] = [];
    collectCssFiles(root, files);

    const contents: string[] = [];
    for (const file of files) {
      let content: string;
      try {
        content = fs.readFileSync(file, 'utf-8');
      } catch (error) {
        continue;
      }
      if (SETTINGS_DECLARATION_REGEX.test(content)) {
        contents.push(content);
      }
    }

    cachedFiles = contents;
  } catch (error) {
    cachedFiles = [];
  }

  return cachedFiles;
}
