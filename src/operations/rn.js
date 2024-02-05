import { resolve } from 'path';
import { getCurrentDirectory } from '../helpers/console.js';
import { rename } from 'fs/promises';

export const rn = async (path, newPath) => {
  try {
    if (path && newPath) {
      const currentDir = process.cwd();
      await rename(resolve(currentDir, path), resolve(currentDir, newPath));
      getCurrentDirectory();
    } else {
      console.log('Invalid input');
    }
  } catch {
    console.log('Operation failed');
  }
}