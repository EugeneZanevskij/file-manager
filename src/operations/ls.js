import { join } from 'path';
import { readdir,stat } from 'fs/promises';
import { getCurrentDirectory } from '../helpers/console.js';

export const ls = async (path) => {
  try {
    if (path) {
      console.log('Invalid input');
    } else {
      const currentDir = process.cwd();
      const content = await readdir(currentDir);

      const directories = [];
      const files = [];

      for (const item of content) {
        const itemPath = join(currentDir, item);
        const stats = await stat(itemPath);
        if (stats.isDirectory()) {
          directories.push({name: item, type: "directory"});
        } else {
          files.push({ name: item, type: "file" });
        }
      }

      const contentArray = [ ...directories, ...files];
      console.table(contentArray);
      getCurrentDirectory();
    }
  } catch {
    console.log('Operation failed');
  }
}