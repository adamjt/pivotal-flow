const { shouldSkipHook, getCommitMessage, appendIdToMessage, writeCommitMessage } = require('./utils');
const { log, logObject } = require('../../utils/common');
const { getStoryIdFromCurrentBranch } = require('../../utils/pivotal');

/**
 * prepare-commit-msg & append story ID from branch
 *
 * @param {String} filename - path to commit-msg file
 * @param {String} source - 'commit' | 'message'
 * @param {String} sha - the commit SHA
 */
const prepareCommitMessage = async (filename, source, sha) => {
  logObject('\nprepare-commit-msg inputs', { filename, source, sha });

  if (shouldSkipHook(filename, source, sha)) {
    log('hook skipped');
    process.exit(0);
  }

  const message = getCommitMessage(filename);
  const { found, formatted: formattedId } = getStoryIdFromCurrentBranch();

  if (!found) {
    log('hook skipped, story ID not found in branch name');
    process.exit(0);
  }

  logObject('story details from branch', { found, formattedId });

  const finalMessage = appendIdToMessage(message, formattedId);
  writeCommitMessage(finalMessage, filename);

  log('\n\n');
};

module.exports = prepareCommitMessage;
