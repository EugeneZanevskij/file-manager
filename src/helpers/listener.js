import {resolve} from 'path';
import { homedir } from 'os';
import { getCurrentDirectory } from './console.js';

const up = (path) => {
  try {
    if (path) {
      console.log('Invalid input');
    } else {
      const currentDir = process.cwd();
      const parentDir = resolve(currentDir, '..');
      console.log(currentDir, parentDir);
      if (parentDir !== currentDir) {
        process.chdir(parentDir);
      }
      getCurrentDirectory();
    }
  } catch {
    console.log('Operation failed');
  }
};

export const listener = (data) => {
  const [command, path] = data.toString().trim().split(' ');
  switch (command) {
    case 'up': up(path);
      break;
    default: console.log(`Unknown command: ${command}`);
  }
}