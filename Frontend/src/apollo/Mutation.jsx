import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
  mutation ($input: UserInput!) {
    signin(input: $input) {
      id
      name
      email
      role
    }
  }
`;

export const USER_LOGIN = gql`
  mutation ($input: LoginInput!) {
    singup(input: $input) {
      token
      user {
        id
        name
        role
      }
    }
  }
`;
