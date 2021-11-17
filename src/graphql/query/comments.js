import {gql} from '@apollo/client';

export const GET_COMMENTS_BYID = gql`
  query($id: Int!) {
    GetAllComments(articles_id: $id) {
      id
      comment
      users_id
      users {
        id
        fullname
        email
        roles
      }
    }
  }
`;
