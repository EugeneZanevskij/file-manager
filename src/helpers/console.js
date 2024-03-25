const userArgs = process.argv[2];
const username = userArgs.startsWith('--username=') ? userArgs.replace('--username=', '') : 'Anonymous';

export const startOfApp = () => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

export const endOfApp = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

export const getCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
}