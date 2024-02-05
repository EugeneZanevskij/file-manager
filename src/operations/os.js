import { EOL } from 'os';
import { getWorkingDirectory } from '../helpers/console.js';

export const os = (argument) => {
  if (argument) {
    switch (argument) {
      case '--EOL': 
        console.log(JSON.stringify(EOL));
        getWorkingDirectory();
        break
      default:
        console.log('Invalid input');
        break
    }
  } else {
    console.log('Operation failed');
  }
}