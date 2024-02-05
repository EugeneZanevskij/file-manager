import { resolve, join } from 'path';
import { getCurrentDirectory } from './console.js';
import { open, readdir, rename, stat, unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { output } from './output.js';

import { up, cd } from '../operations/navigation.js';

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

const add = async (path) => {
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

const rn = async (path, newPath) => {
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

const cp = async (path, newPath) => {
  try {
    if (path && newPath) {
      const currentDir = process.cwd();
      const readStream = createReadStream(resolve(currentDir, path), {encoding: 'utf-8'});
      const writeStream = createWriteStream(resolve(currentDir, newPath), {encoding: 'utf-8'});
      await pipeline(readStream, writeStream);
      getCurrentDirectory();
    } else {
      console.log('Invalid input');
    }
  } catch {
    console.log('Operation failed');
  }
}

const mv = async (path, newPath) => {
  try {
    if (path && newPath) {
      const currentDir = process.cwd();
      const readStream = createReadStream(resolve(currentDir, path), {encoding: 'utf-8'});
      const writeStream = createWriteStream(resolve(currentDir, newPath), {encoding: 'utf-8'});
      await pipeline(readStream, writeStream);
      await unlink(resolve(currentDir, path));
      getCurrentDirectory();
    } else {
      console.log('Invalid input');
    }
  } catch {
    console.log('Operation failed');
  }
}

const rm = async (path) => {
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

export const listener = async (data) => {
  const [command, path, newPath] = data.toString().trim().split(' ');
  switch (command) {
    case 'up': up(path);
      break;
    case 'cd': cd(path);
      break;
    case 'ls': await ls(path);
      break;
    case 'cat': await cat(path);
      break;
    case 'add': await add(path);
      break;
    case 'rn': await rn(path, newPath);
      break;
    case 'cp': await cp(path, newPath);
      break;
    case 'mv': await mv(path, newPath);
      break;
    case 'rm': await rm(path);
      break;
    default: console.log(`Unknown command: ${command}`);
  }
}