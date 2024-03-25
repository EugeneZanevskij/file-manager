import { resolve } from 'path';
import { unlink } from 'fs/promises';
import { getCurrentDirectory } from '../helpers/console.js';

export const rm = async (path) => {
  try {
    if (path) {
      const currentDir = process.cwd();
      await unlink(resolve(currentDir, path));
      getCurrentDirectory();
    } else {
      console.log('Invalid input');
    }
  } catch {
    console.log('Operation failed');
  }
}