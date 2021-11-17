import {gql} from '@apollo/client';

export const GET_DETAIL_ARTICLE = gql`
  query getDetailArticles($id: Int!) {
    GetDetailArticles(id: $id) {
      id
      author {
        fullname
      }
      comments {
        created_at
        comment
        users {
          fullname
        }
        id
      }
      content
      title
      images
      dislikes
      likes
      categories {
        id
        name
      }
      likes_dislikes {
        articles_id
        likes_dislikes
      }
    }
  }
`;
