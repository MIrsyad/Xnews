import {gql} from '@apollo/client';

export const GET_ALL_CATEGORY = gql`
  query {
    GetAllCategories {
      id
      name
    }
  }
`;
