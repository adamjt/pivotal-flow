const { readFileSync } = require('fs');
const chalk = require('chalk');

const checkCommitMessagePivotalId = filename => {
  const message = readFileSync(filename, { encoding: 'utf8' });
  const PIVOTAL_MESSAGE_REGEX = /\b\d{9}\b/;

  if (!PIVOTAL_MESSAGE_REGEX.test(message)) {
    console.log(chalk.yellow`
${chalk.inverse('[WARNING]')} A Pivotal Story ID is missing from your commit message! 🦄

Your commit message: ${chalk.white.bold(message)}

If this is your first time contributing to this repository - welcome!
Please refer to: ${chalk.underline('https://github.com/ClearTax/pivotal-flow#usage')} to get started.

---
${chalk.dim(`
Without the Pivotal Story ID in your commit message, you would lose out on automatic updates to Pivotal stories when
pushing your branch to the remote.

Use the ${chalk.underline('pivotal-flow-prepare-commit-msg')} hook to automate this for you.
`)}`);
    return process.exit(1);
  }

  process.exit(0);
};

module.exports = checkCommitMessagePivotalId;
