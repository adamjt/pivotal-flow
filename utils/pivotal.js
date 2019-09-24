const { inDetachedHeadState, getCurrentBranch } = require('./git');

const PIVOTAL_ID_REGEX = /#?(\d{6,10})/g;

/**
 * Get the Pivotal story id details from a string;
 * @param {String} input - any string input to search for story id In
 * @returns {BranchStoryId} Story id details from the branch.
 */
const getStoryId = (exports.getStoryId = (input = '') => {
  const matches = input.match(PIVOTAL_ID_REGEX) || [''];
  const [matched] = matches;

  const storyId = matched.startsWith('#') ? matched.substring(1) : matched;
  const formatted = `#${storyId}`;
  const found = Boolean(storyId);

  return { found, id: storyId, formatted };
});

/**
 * Get the Pivotal story id details from the branch name (if it exists).
 * @returns {BranchStoryId} Story id details from the branch.
 */
exports.getStoryIdFromCurrentBranch = () => {
  if (inDetachedHeadState()) return { found: false };

  const branchName = getCurrentBranch() || '';

  return getStoryId(branchName);
};
