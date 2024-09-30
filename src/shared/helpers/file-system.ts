import { fileURLToPath } from 'node:url';
import { dirname, basename } from 'node:path';

export function getCurrentModuleDirectoryPath() {
  const filepath = fileURLToPath(import.meta.url);

  return dirname(filepath);
}

export function getFileName(value: string) {
  return basename(value);
}
