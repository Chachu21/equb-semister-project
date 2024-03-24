import { gql } from "@apollo/client";

// Signup Mutation
export interface SignupMutationVariables {
  full_name: string;
  email: string;
  phone_no: string;
  password: string;
  agreeTerms: boolean;
}

export interface SignupMutationResponse {
  signup: {
    id: string;
    massage: string;
    // Update with the appropriate fields returned by your signup mutation
  };
}

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $full_name: String!
    $email: String!
    $phone_no: String!
    $password: String!
    $agreeTerms: Boolean!
  ) {
    signup(
      object: {
        full_name: $full_name
        email: $email
        phone_no: $phone_no
        password: $password
        agreeTerms: $agreeTerms
      }
    ) {
      id
      message
      # Add any additional fields returned by your signup mutation
    }
  }
`;

// Login Mutation
export interface LoginMutationVariables {
  email: string;
  password: string;
}

export interface LoginMutationResponse {
  login: {
    id: string;
    token: string;
    // Update with the appropriate fields returned by your login mutation
  };
}

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(credential: { email: $email, password: $password }) {
      id
      token
      # Add any additional fields returned by your login mutation
    }
  }
`;

// export const LOGIN_MUTATION = gql`
//   query MyQuery($email: String!, $password: String!) {
//     login(credential: { email: $email, password: $password }) {
//       id
//       token
//     }
//   }
// `;
