import  { homedir } from 'os';
import { chdir } from 'process';
import { getCurrentDirectory, startOfApp, endOfApp } from './helpers/console.js';
import { listener } from './helpers/listener.js';

const changeHomeDirectory = () => {
  chdir(homedir());
  getCurrentDirectory();
}

startOfApp();
changeHomeDirectory();

process.stdin.on('data', listener);

process.on('SIGINT', () => {
  endOfApp();
})