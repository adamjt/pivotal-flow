#!/usr/bin/env node

const { execSync } = require('child_process');
const chalk = require('chalk');

// https://github.com/typicode/husky#access-git-params-and-stdin
const { HUSKY_GIT_PARAMS: params } = process.env;

const options = {
  encoding: 'utf8',
};

const [prevHead, currentHead, checkoutType] = params.split(' ');

// ignore if it is a file checkout. File checkout returns '0', branch checkout return '1'
if (checkoutType === '0') {
  process.exit(0);
}
// get the branch name after check out
const branchName = execSync('git symbolic-ref --short -q HEAD', options).trim();

// no of checkouts
const checkoutCount = execSync(`git reflog --date=local | grep -o '${branchName}' | wc -l`, options).trim();

// support branch name without # ie. feature/myFeature_877665456
const PIVOTAL_MESSAGE_REGEX = /^[^\b#]+\d{9}\b/;

/**
 * Check if pivotal id is present in the given input
 * @param str
 * @example checkPivotalId(feature/newShinyFeature) --> false
 * @example checkPivotalId(feature/newShinyFeature_168185812) --> true
 */
const checkPivotalId = str => PIVOTAL_MESSAGE_REGEX.test(str);

// if previous head and current head are equal and checkout count is 1 it is probably a new branch
if (prevHead === currentHead && checkoutCount === '1' && !checkPivotalId(branchName)) {
  console.log(chalk.yellow`
    [BEING NAUGHTY] Where is your pivotal story ID in your branch name?

    But, if you are new to this repo: Welcome!
    Please refer to: https://docs.internal.cleartax.co/engineering/workflow/pivotal-story-development.html#setting-up-auto-updates-on-pivotal

    ------ ORIGINAL BRANCH MESSAGE ------
    ${branchName}
  `);
  return process.exit(1);
}

process.exit(0)
