#!/usr/bin/env node

/* https://github.com/typicode/husky#access-git-params-and-stdin */
const { HUSKY_GIT_PARAMS: params = '' } = process.env;
const [filename, source, commitSHA] = params.split(' ');

require('./hook')(filename, source, commitSHA);
