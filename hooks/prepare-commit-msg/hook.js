const { inspect } = require('util');
const { shouldSkipHook, getCommitMessage, appendIdToMessage, writeCommitMessage } = require('./utils');
const { log } = require('../../utils/common');
const { getStoryIdFromCurrentBranch } = require('../../utils/pivotal');

/**
 * prepare-commit-msg & append story ID from branch
 *
 * @param {String} filename - path to commit-msg file
 * @param {String} source - 'commit' | 'message'
 * @param {String} sha - the commit SHA
 */
const prepareCommitMessage = async (filename, source, sha) => {
  log('\n\nprepare-commit-msg\n\n');
  log('husky inputs:\n', inspect({ filename, source, sha }, true, 3, true));

  if (shouldSkipHook(filename, source, sha)) {
    process.exit(0);
  }

  const message = getCommitMessage(filename);
  const { found, formatted: formattedId } = getStoryIdFromCurrentBranch();

  if (!found) {
    process.exit(0);
  }

  const finalMessage = appendIdToMessage(message, formattedId);
  writeCommitMessage(finalMessage, filename);

  log('\n\n');
};

module.exports = prepareCommitMessage;
