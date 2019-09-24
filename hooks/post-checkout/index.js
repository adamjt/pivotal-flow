#!/usr/bin/env node

/* https://github.com/typicode/husky#access-git-params-and-stdin */
const { HUSKY_GIT_PARAMS: params = '' } = process.env;
const [prevHead, currentHead, checkoutType] = params.split(' ');

require('./hook')(prevHead, currentHead, checkoutType);
