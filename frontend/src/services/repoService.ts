import client from './apolloClient';
import { gql } from '@apollo/client';

export const GET_USER_REPOS = gql`
  query GetUserRepos {
    myRepos {
      id
      name
      latest_release_date
      owner
      has_seen
      latest_version
      release_html
    }
  }
`;

export const ADD_REPO = gql`
  mutation AddRepo($name: String!, $owner: String!) {
    addRepo(name: $name, owner: $owner) {
      id
      name
      owner
    }
  }
`;

export const MARK_AS_SEEN = gql`
  mutation MarkAsSeen($repoId: ID!) {  
    markAsSeen(repoId: $repoId) {
      id
      has_seen
    }
  }
`;
export const addRepo = async (name: string, owner: string) => {
  try {
    const { data } = await client.mutate({
      mutation: ADD_REPO,
      variables: { name, owner },
      refetchQueries: [{ query: GET_USER_REPOS }], 
    });
    return data;
  } catch (error) {
    console.error('Error adding repo:', error);
    throw error;
  }
};

export const markRepoSeen = async (repoId: String) => {
  try {
    const { data } = await client.mutate({
      mutation: MARK_AS_SEEN,
      variables: { repoId },
      refetchQueries: [{ query: GET_USER_REPOS }],  
    });
    return data;
  } catch (error) {
    console.error('Error marking repo as seen:', error);
    throw error;
  }
};
