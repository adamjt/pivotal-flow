const chalk = require('chalk');
const { inspect } = require('util');

/**
 * Truncate a given long string and add ellipsis
 * @param {string} str
 * @return {string} - Truncated string
 */
const truncate = (exports.truncate = (str, upto = 100) => {
  if (str.length <= upto) return str;
  const truncated = str.substring(0, upto);
  return `${truncated.substring(0, truncated.lastIndexOf(' '))} ...`;
});

/**
 * Log only if process.env.HUSKY_DEBUG === '1'
 */
const log = (exports.log = (...args) => {
  if (process.env.HUSKY_DEBUG === '1') {
    console.debug(...args);
  }
});

/**
 * Log an object for debugging with a label
 * @param {String} label - Label for the log
 * @param {Object} obj - The debug object to log
 * @param {Object} options - Options passed to the util.inspect() function
 * @param {Boolean} options.showHidden - Show hidden values
 * @param {Boolean} options.color - Show colorized output
 * @param {Number | null} options.depth - Depth of object values to recursively display - default 1
 */
const logObject = (exports.logObject = (label, obj, options) => {
  const { showHidden = true, depth = 1, color = true } = options || {};
  log(`${chalk.underline(label)}: ${inspect(obj, showHidden, depth, color)}`);
});
