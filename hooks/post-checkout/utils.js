const { inDetachedHeadState } = require('../../utils/git');
const { logObject } = require('../../utils/common');

/**
 * Skip the check in certain situations:-
 * - when checking out a file
 * - when checking out to a SHA
 */
const shouldSkipBranchCheck = (exports.shouldSkipBranchCheck = (
  /* checkout out from */
  prevHead,
  /* checkout out to */
  currentHead,
  /* checkoutType is 0 when it's a file checkout */
  checkoutType
) => {
  // if it's not a branch checkout
  if (checkoutType !== '1') {
    lologObjectg('skipped due to checkoutType', { checkoutType });
    return true;
  }

  // if we're in a detached head state (eg. submodule checkout or rebase)
  const detached = inDetachedHeadState();

  logObject('inDetachedHeadState?', { detached });
  return detached;
});
