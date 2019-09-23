const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');
const { inspect } = require('util');
const { resolve } = require('path');

const { getCurrentBranch, getRootDirectory } = require('../../utils/git');
const { getStoryId } = require('../../utils/pivotal');
const { log } = require('../../utils/common');

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
exports.shouldSkipHook = (_filename, source, sha) => source === 'commit';

/**
 * Get contents of commit message file
 * @param {String} filename
 */
exports.getCommitMessage = filename => {
  const message = readFileSync(filename, { encoding: 'utf-8' });
  log('\noriginal commit message:\n', inspect({ message }, true, 3, true));
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
  const { found, formatted } = getStoryId(message);

  if (found) {
    log('\nskipping since story id already present in commit message\n', inspect({ message }, true, 3, true));
    return message;
  }

  const messageWithId = [message, '---', `[${storyId}]`].join('\n');
  log('\nappended to the commit message\n', inspect({ message: messageWithId }, true, 3, true));
  return messageWithId;
};

/**
 * Write the final commit message to the filename provided by husky.
 */
exports.writeCommitMessage = (message, path) => {
  const rootDirectory = getRootDirectory();
  return writeFileSync(resolve(rootDirectory, path), message, { encoding: 'utf-8' });
};
