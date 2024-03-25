import {resolve, join} from 'path';
import { chdir } from 'process';
import { getCurrentDirectory } from '../helpers/console.js';

export const up = (path) => {
  try {
    if (path) {
      console.log('Invalid input');
    } else {
      const currentDir = process.cwd();
      const parentDir = resolve(currentDir, '..');
      if (parentDir !== currentDir) {
        process.chdir(parentDir);
      }
      getCurrentDirectory();
    }
  } catch {
    console.log('Operation failed');
  }
};

export const cd = (path) => {
  try {
    if (path) {
      const currentDir = process.cwd();
      chdir(resolve(currentDir, path));
      getCurrentDirectory();
    } else {
      console.log('Invalid input');
    }
  } catch {
    console.log('Operation failed');
  }
}