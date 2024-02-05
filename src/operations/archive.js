import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';
import { parse, resolve } from 'path';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';
import { getCurrentDirectory } from '../helpers/console.js';

const isDirectory = async (path) => {
  try {
    const src = resolve(path);
    const stats = await stat(src);
    return stats.isDirectory();
  } catch {
    return false;
  }
};

const isFile = async (path) => {
  try {
    const src = resolve(path);
    const stats = await stat(src);
    return stats.isFile();
  } catch {
    return false;
  }
};

export const compress = async (path, newPath) => {
  try {
    if (path && newPath) {
      const currentDir = process.cwd();
      const pathFile = resolve(currentDir, path);
      const newPathDirectory = resolve(currentDir, newPath);
      const pathIsFile = await isFile(pathFile);
      const newPathIsDirectory = await isDirectory(newPathDirectory);
      if (!pathIsFile) {
        console.log(`${path} is not a file`);
        return;
      } else if (!newPathIsDirectory) {
        console.log(`${newPath} is not a directory`);
        return;
      }
      const { base } = parse(pathFile);
      const readableStream = createReadStream(pathFile, { encoding: 'utf-8' });
      const brotli = createBrotliCompress();
      const writeableStream = createWriteStream(resolve(newPathDirectory, `${base}.br`), { encoding: 'utf-8' });
      await pipeline(readableStream, brotli, writeableStream);
      getCurrentDirectory();
    } else {
      console.log('Invalid input');
    }
  } catch (error) {
    console.error('Operation failed:', error);
  }
};