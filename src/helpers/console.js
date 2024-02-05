const userArgs = process.argv[2];
const username = userArgs.startsWith('--username=') ? userArgs.replace('--username=', '') : 'Anonymous';

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