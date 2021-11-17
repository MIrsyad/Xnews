import {gql} from '@apollo/client';

export const GET_ARTICLES_BY_CATEGORIES = gql`
  query getAllArticlesById($id: Int!) {
    GetAllArticlesByCategories(id: $id) {
      articles {
        id
        author {
          fullname
        }
        title
        images
        content
        created_at
        dislikes
        likes
        likes_dislikes {
          articles_id
          likes_dislikes
        }
        comments {
          comment
          users {
            fullname
          }
        }
        categories {
          id
          name
        }
      }
      name
    }
  }
`;

export default {
  get: GET_ARTICLES_BY_CATEGORIES,
};
