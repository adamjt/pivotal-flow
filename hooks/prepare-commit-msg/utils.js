const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const { getRootDirectory } = require('../../utils/git');
const { getStoryId } = require('../../utils/pivotal');
const { logObject } = require('../../utils/common');

/**
 * Skip the hook when
 *  - source is a commit (eg. amend)
 * @param {String} filename - Path to commit-msg file
 * @param {String} source - 'commit' | 'message'
 * @param {String} sha - the commit SHA
 * @returns {Boolean}
 * @example shouldSkipHook(.git/COMMIT_EDITMSG', 'message') => false
 * @example shouldSkipHook(.git/COMMIT_EDITMSG', 'commit', 'HEAD') => false // git amend
 */
exports.shouldSkipHook = (_filename, source) => source === 'commit';

/**
 * Get contents of commit message file
 * @param {String} filename
 */
exports.getCommitMessage = filename => {
  const message = readFileSync(filename, { encoding: 'utf-8' });
  logObject('original commit message', { message });
  return message;
};

/**
 * @typedef {Object} BranchStoryId
 * @property {Number} id - actual story id as an integer
 * @property {String} formatted - with the #prefix
 * @property {Boolean} found - Whether the id was present in the branch or not.
 */

/**
 * Append story id to given commit message.
 * @param {String} message - Original Commit Message
 * @param {String} storyId - Story id extracted from the branch.
 */
exports.appendIdToMessage = (message, storyId) => {
  const { found, formatted: existingStoryId } = getStoryId(message);

  if (found) {
    logObject('skipping - story id already present', { found, message, storyId, existingStoryId });
    return message;
  }

  const messageWithId = [message, '---', `[${storyId}]`].join('\n');
  logObject('appended to the commit message', { message: messageWithId });
  return messageWithId;
};

/**
 * Write the final commit message to the filename provided by husky.
 */
exports.writeCommitMessage = (message, path) => {
  const rootDirectory = getRootDirectory();
  return writeFileSync(resolve(rootDirectory, path), message, { encoding: 'utf-8' });
};
