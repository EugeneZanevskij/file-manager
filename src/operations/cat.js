import { createReadStream } from 'fs';
import { getCurrentDirectory } from "../helpers/console.js";
import { output } from "../helpers/output.js";
import { pipeline } from 'stream/promises';
import { resolve } from 'path';

export const cat = async (path) => {
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