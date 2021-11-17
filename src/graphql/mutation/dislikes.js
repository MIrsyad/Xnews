import {gql} from '@apollo/client';

export const DISLIKES = gql`
  mutation Dislikes(
    $articles_id: Int
    $users_id: Int
    $likes_dislikes: Boolean
  ) {
    dislikes(
      articles_id: $articles_id
      users_id: $users_id
      likes_dislikes: $likes_dislikes
    ) {
      articles_id
      users_id
      likes_dislikes
    }
  }
`;

export default {
  add: DISLIKES,
};
