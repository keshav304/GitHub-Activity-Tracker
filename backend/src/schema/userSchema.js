import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
  signup(email: String!, password: String!): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
}
`;
