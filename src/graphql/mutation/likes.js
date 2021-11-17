import {gql} from '@apollo/client';

export const LIKES = gql`
  mutation Likes($articles_id: Int, $users_id: Int, $likes_dislikes: Boolean) {
    likes(
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
  add: LIKES,
};
