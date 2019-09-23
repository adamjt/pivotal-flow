#!/usr/bin/env node
const { shouldSkipBranchCheck } = require('./utils');

/* https://github.com/typicode/husky#access-git-params-and-stdin */
const { HUSKY_GIT_PARAMS: params } = process.env;
