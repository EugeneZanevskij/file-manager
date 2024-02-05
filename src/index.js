const userArgs = process.argv[2];
const username = userArgs.startsWith('--username=') ? userArgs.replace('--username=', '') : 'Anonymous';

const startOfApp = () => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

const endOfApp = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

startOfApp();

process.stdin.on('data', (data) => {
  process.stdout.write(data);
});

process.on('SIGINT', () => {
  endOfApp();
})