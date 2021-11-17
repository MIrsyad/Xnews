import {gql} from '@apollo/client';

export const UPDATE_USERS = gql`
  mutation updateUsers($id: Int!, $fullname: String) {
    updateUsers(id: $id, fullname: $fullname) {
      id
      fullname
    }
  }
`;

export default {
  update: UPDATE_USERS,
};
