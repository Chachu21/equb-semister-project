import { gql } from "@apollo/client";

export interface CommentVaribles {
  full_name: string;
  email: string;
  content: string;
  rating: number;
}

export interface CommentResponse {
  insert_comment_one: {
    full_name: string;
    email: string;
    content: string;
    rating: number;
  };
}

export const COMMENT_MUTATION = gql`
  mutation MyMutation(
    $full_name: String!
    $email: String!
    $content: String!
    $rating: Int!
  ) {
    insert_comment_one(
      object: {
        full_name: $full_name
        email: $email
        content: $content
        rating: $rating
      }
    ) {
      full_name
      email
      content
      rating
    }
  }
`;
// mutation Comment_Mutation($object: comment_insert_input!) {
//   insert_comment_one(object: $object) {
//     full_name
//     email
//     content
//     rating
//   }
// }
