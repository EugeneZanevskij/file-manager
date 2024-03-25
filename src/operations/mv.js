import { resolve } from 'path';
import { unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { getCurrentDirectory } from '../helpers/console.js';

export const mv = async (path, newPath) => {
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