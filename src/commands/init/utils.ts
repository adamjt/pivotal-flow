import chalk from 'chalk';

import inquirer from '../../utils/inquirer';
import { PromptToSetup, SetupQuestions, SetupAnswers } from './questions';
import { log, error } from '../../utils/console';

export const isSetupComplete = () => !!(process.env.PIVOTAL_TOKEN && process.env.PIVOTAL_PROJECT_ID);

/**
 * Displays the instructions based on user's answers.
 * @param {SetupAnswers} answers - Setup prompt answers
 */
const displaySetupInstructions = ({ pivotalToken, pivotalProjectId }: SetupAnswers) =>
  log(chalk`
To get started with pivotal-flow, run the following commands in your current terminal session:-

  {bold export PIVOTAL_TOKEN=${pivotalToken}}
  {bold export PIVOTAL_PROJECT_ID=${pivotalProjectId}}

{dim.italic You can also add them to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc) so the environment variables are automatically added for all new terminal sessions.}
`);

/**
 * Collects user input & displays setup instructions accordingly.
 */
export const performSetup = async () => {
  const answers = await inquirer.prompt(SetupQuestions);
  const { pivotalProjectId, pivotalToken } = answers;

  if (pivotalProjectId && pivotalToken) {
    displaySetupInstructions(answers);
  } else {
    error('Failed to set-up pivotal-flow. Please try again.');
  }
};

/**
 * Aborts if pivotal-flow has not been set-up. Displays setup instructions before aborting.
 */
export const abortIfNotSetup = async () => {
  if (!isSetupComplete()) {
    const { wantSetup } = await inquirer.prompt(PromptToSetup);
    if (wantSetup) {
      await performSetup();
    } else {
      error(`Setup for pivotal-flow incomplete. Please try again after running 'pivotal-flow init'.`);
    }
    // return non-zero error code when set-up is not completed.
    process.exit(wantSetup ? 0 : 1);
  } else {
    return;
  }
};
