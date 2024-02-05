const userArgs = process.argv[2];
const username = userArgs.startsWith('--username=') ? userArgs.replace('--username=', '') : 'Anonymous';
import  { homedir } from 'os';
import { chdir } from 'process';

const startOfApp = () => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

const endOfApp = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

const getCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
}

const changeHomeDirectory = () => {
  chdir(homedir());
  getCurrentDirectory();
}

startOfApp();
changeHomeDirectory();

process.stdin.on('data', (data) => {
  process.stdout.write(data);
  getCurrentDirectory();
});

process.on('SIGINT', () => {
  endOfApp();
})