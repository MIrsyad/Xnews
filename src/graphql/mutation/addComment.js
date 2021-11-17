import {gql} from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation createComment($comment: String, $users_id: Int, $articles_id: Int) {
    createComment(
      comment: $comment
      users_id: $users_id
      articles_id: $articles_id
    ) {
      articles_id
      comment
      id
      users{
        fullname
      }
      users_id
    }
  }
`;

export default {
  add: ADD_COMMENT,
};
