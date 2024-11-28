import { gql } from 'apollo-server-express';

export const repoTypeDefs = gql`
  type Repository {
    id: ID!
    name: String!
    latest_release_date: String
    latest_version: String
    release_html: String
    owner: String!
    has_seen: Boolean!
    user_id: ID!
  }

  type Query {
    myRepos: [Repository!]!
  }

  type Mutation {
    addRepo(name: String!, owner: String!): Repository!
    markAsSeen(repoId: ID!): Repository!
  }
`;
