#!/usr/bin/env node

const { HUSKY_GIT_PARAMS } = process.env;
const { logObject } = require('../utils/common');

/**
 * Use this to test what params you receive when executing a hook & then add them to test cases
 * @example "pre-commit": "HUSKY_DEBUG=1 ./hooks/record-params.js"
 */

logObject('params', { HUSKY_GIT_PARAMS, params: HUSKY_GIT_PARAMS.trim().split(' ') });
