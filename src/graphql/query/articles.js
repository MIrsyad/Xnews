import {gql} from '@apollo/client';

export const GET_ALL_ARTICLES = gql`
  query getallarticle {
    GetAllArticles {
      id
      title
      content
      likes
      dislikes
      created_at
      images
      comments {
        comment
        id
        created_at
        users {
          fullname
          id
        }
      }
      author {
        fullname
      }
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

export default {
  get: GET_ALL_ARTICLES,
};
