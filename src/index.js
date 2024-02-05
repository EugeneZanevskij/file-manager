const userArgs = process.argv[2];
const username = userArgs.startsWith('--username=') ? userArgs.replace('--username=', '') : 'Anonymous';

const startOfWork = () => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

startOfWork();