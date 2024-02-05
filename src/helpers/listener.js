import {resolve, join} from 'path';
import { chdir } from 'process';
import { getCurrentDirectory } from './console.js';
import { readdir, stat } from 'fs/promises';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { output } from './output.js';

const up = (path) => {
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

const cd = (path) => {
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

const ls = async (path) => {
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

const cat = async (path) => {
  try {
    if (path) {
      const readStream = createReadStream(resolve(path), {encoding: 'utf-8'});
      await pipeline(readStream, output());
      getCurrentDirectory();
    } else {
      console.log('Invalid input');
    }
  } catch {
    console.log('Operation failed');
  }
}

export const listener = async (data) => {
  const [command, path] = data.toString().trim().split(' ');
  switch (command) {
    case 'up': up(path);
      break;
    case 'cd': cd(path);
      break;
    case 'ls': await ls(path);
      break;
    case 'cat': await cat(path);
      break;
    default: console.log(`Unknown command: ${command}`);
  }
}