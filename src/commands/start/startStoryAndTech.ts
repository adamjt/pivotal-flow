import inquirer, { QuestionCollection } from 'inquirer';

import PivotalClient from "../../utils/pivotal/client";
import { PivotalReview, PivotalProfile, PivotalReviewState, PivotalStoryResponse, StoryState } from '../../utils/pivotal/types';
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
      choices: [
        ...reviewChoices,
        { name: 'None', reviewId: -1 }
      ],
    },
  ];
};

export default async (
  client: PivotalClient,
  reviewer: PivotalProfile,
  story: PivotalStoryResponse,
): Promise<void> => {
  if (story.current_state == StoryState.Unstarted) {
    const owner_ids = [...new Set([...story.owner_ids, reviewer.id])];
    await client.updateStory(story.id, { current_state: StoryState.Started, owner_ids });
  }
  const reviews = await client.getReviews(story.id);
  if (reviews && reviews.length > 0) {
    const { reviewId } = await inquirer.prompt(getReviewerTechQuestions(reviews));
    if (reviewId > 0) {
      await client.updateReview(story.id, reviewId, { reviewer_id: reviewer.id, status: PivotalReviewState.InReview });
    }
  }
};
