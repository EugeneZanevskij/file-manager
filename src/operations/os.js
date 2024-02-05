import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { getCurrentDirectory } from '../helpers/console.js';

export const os = (argument) => {
  if (argument) {
    switch (argument) {
      case '--EOL': 
        console.log(JSON.stringify(EOL));
        getCurrentDirectory();
        break;
      case '--cpus':
        const cpusInfo = cpus().map(({ model, speed }) => {
          return { model, clockRate: `${(speed / 1000).toFixed(2)} GHz` };
        });
        console.table(cpusInfo);
        getCurrentDirectory();
        break;
      case '--homedir':
        console.log(`Home directory: ${homedir()}`);
        getCurrentDirectory();
        break;
      case '--username':
        console.log(`Username: ${userInfo().username}`);
        getCurrentDirectory();
        break;
      case '--architecture':
        console.log(`Architecture: ${arch()}`);
        getCurrentDirectory();
        break;
      default:
        console.log('Invalid input');
        break;
    }
  } else {
    console.log('Operation failed');
  }
}