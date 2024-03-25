import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { getCurrentDirectory } from '../helpers/console.js';

export const hash = async (path) => {
  if (path) {
    try {
      const data = await readFile(resolve(path), 'utf8');
      const hash = createHash('sha256').update(data).digest('hex');
      console.log(hash);
      getCurrentDirectory();
    } catch (error) {
      console.log('Operation failed');
    }
  } else {
    console.log('Invalid input');
  }
};