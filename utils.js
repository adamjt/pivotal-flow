const chalk = require('chalk');

const { PIVOTAL_TOKEN, PIVOTAL_PROJECT_ID } = process.env;
const isSetupDone = !!(PIVOTAL_TOKEN && PIVOTAL_PROJECT_ID);

/**
 * Format the labels string
 * @param {string} value
 * @example formatLabels('dx, 2.0, test') => ['dx', '2.0', 'test']
 * @example formatLabels('') => []
 */
const formatLabels = value => {
  if (!value) return [];
  return value.split(',').map(val => val.trim());
};

/**
 * Add prefix to the story type
 * @param {String} storyType
 * @example getBranchPrefix('feature') => feature
 * @example getBranchPrefix('bug') => bugfix
 * @example getBranchPrefix('chore') => chore
 */
const getBranchPrefix = storyType => {
  return storyType === 'bug' ? 'bugfix' : storyType;
};

const CHECKOUT_QUESTIONS = [
  {
    type: 'confirm',
    name: 'confirmCheckout',
    message: '\n\nWould you like to create a new git branch for the story?',
    default: false,
  },
  {
    type: 'input',
    name: 'branchName',
    message: chalk.yellow(
      `${chalk.green('{ feature | bug | chore }')} will be prefixed with the branch name.
      \ni.e if you choose ${chalk.green('feature')} as the story type and ${chalk.green('gstr9Preview')} as
      \nthe branch name then your final branch name would be ${chalk.green(`feature/gstr9Preview_pivotalID`)}
      \nEnter the branch name:`
    ),
    validate: val => {
      // branch name should not be too short
      if (val && val.length > 3) return true;
      return 'Please enter a valid branch name.';
    },
    when: answers => {
      return answers.confirmCheckout;
    },
  },
];

const CONFIRM_QUESTIONS = [
  {
    type: 'confirm',
    name: 'projectSetup',
    message: 'Would you like to set up auto creation of pivotal stories?',
    default: false,
  },
];

const SETUP_QUESTIONS = [
  {
    type: 'input',
    name: 'pivotalToken',
    message: chalk.yellow`You can create a pivotal token here https://www.pivotaltracker.com/profile
      \nEnter your pivotal token: `,
    validate: val => {
      if (val && val.length === 32) return true;
      return 'Please enter a valid pivotal token.';
    },
  },
  {
    type: 'input',
    name: 'pivotalProjectId',
    message: chalk.yellow`your can find the project id here https://www.pivotaltracker.com/n/projects/your-project-id
      \nEnter the project id: `,
    validate: value => {
      if (value.match(/^[0-9]{7}/)) return true;
      return 'Please enter a valid 7 digit project id';
    },
  },
];

const STORY_QUESTIONS = [
  {
    type: 'list',
    name: 'story_type',
    message: 'Select the story type',
    choices: ['feature', 'bug', 'chore'],
    default: 0, // 0 --> index of the choices array
  },
  {
    type: 'input',
    name: 'name',
    message: 'Enter the pivotal story name:',
    validate: val => {
      // story name should not be too short
      if (val && val.length > 8) return true;
      return 'Please enter a valid story name';
    },
  },
  {
    type: 'list',
    name: 'estimate',
    message: 'Select the story estimate',
    choices: [0, 1, 2, 3, 5, 8],
    default: 0, // 0 --> index of the choices array
    when: answers => {
      return answers.story_type === 'feature';
    },
  },
  {
    type: 'input',
    name: 'labelValues',
    message: 'Enter the labels by comma seperated values(press enter to ignore):',
  },
];

module.exports = {
  SETUP_QUESTIONS,
  STORY_QUESTIONS,
  CONFIRM_QUESTIONS,
  isSetupDone,
  PIVOTAL_TOKEN,
  PIVOTAL_PROJECT_ID,
  getBranchPrefix,
  CHECKOUT_QUESTIONS,
  formatLabels,
};
