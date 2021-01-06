import inquirer, { QuestionCollection } from 'inquirer';

import PivotalClient from "../../utils/pivotal/client";
import { PivotalReview, PivotalReviewState, PivotalStoryResponse, StoryState } from '../../utils/pivotal/types';
export interface PickReviewAnswers {
  reviewId: number;
}

const getReviewerTechQuestions = (
  reviews: PivotalReview[],
): QuestionCollection<PickReviewAnswers> => {
  const reviewChoices = reviews.map(({ review_type: { name }, id: value }) => ({
    name: `${name} [${value}]`,
    value,
  }));
  return [
    {
      type: 'list',
      name: 'reviewId',
      message: 'Choose a tech to work on?',
      default: 0,
      choices: [...reviewChoices],
    },
  ];
};

export default async (
  client: PivotalClient,
  story: PivotalStoryResponse,
): Promise<void> => {
  const reviews = await client.getReviews(story.id);
  const { reviewId } = await inquirer.prompt(getReviewerTechQuestions(reviews));
  if (story.current_state == StoryState.Unstarted) {
    await client.updateStory(story.id, { current_state: StoryState.Started });
  }
  await client.updateReview(story.id, reviewId, PivotalReviewState.InReview);
};
