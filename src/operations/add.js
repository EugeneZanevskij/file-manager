import { resolve } from 'path';
import { getCurrentDirectory } from '../helpers/console.js';
import { open } from 'fs/promises';

export const add = async (path) => {
  try {
    if (path) {
      const currentDir = process.cwd();
      let file = await open(resolve(currentDir, path), 'w');
      file.close();
      getCurrentDirectory();
    } else {
      console.log('Invalid input');
    }
  } catch {
    console.log('Operation failed');
  }
}