#!/usr/bin/env node

/* https://github.com/typicode/husky#access-git-params-and-stdin */
const { HUSKY_GIT_PARAMS: filename = '' } = process.env;

require('./hook')(filename.trim());
