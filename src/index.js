import  { homedir } from 'os';
import { chdir } from 'process';
import { getCurrentDirectory, startOfApp, endOfApp } from './helpers/console';

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