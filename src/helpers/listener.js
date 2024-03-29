import { up, cd } from '../operations/navigation.js';
import { ls } from '../operations/ls.js';
import { cat } from '../operations/cat.js';
import { add } from '../operations/add.js';
import { rn } from '../operations/rn.js';
import { cp } from '../operations/cp.js';
import { mv } from '../operations/mv.js';
import { rm } from '../operations/rm.js';
import { endOfApp } from './console.js';
import { os } from '../operations/os.js';
import { hash } from '../operations/hash.js';
import { compress } from '../operations/archive.js';

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
    case 'os': os(path);
      break;
    case 'hash': await hash(path);
      break;
    case 'compress': await compress(path, newPath);
      break;
    case '.exit': endOfApp();
      break;
    default: console.log(`Unknown command: ${command}`);
  }
}