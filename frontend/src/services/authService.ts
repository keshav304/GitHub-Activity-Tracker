import client from './apolloClient'; 
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation SignUpUser($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { email, password },
    });
    if (data?.login?.token) {
      localStorage.setItem('authToken', data.login.token);
      return data;
    }
    throw new Error('Failed to log in');
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

export const signUpUser = async (email: string, password: string) => {
  try {
    const { data } = await client.mutate({
      mutation: SIGNUP_USER,
      variables: { email, password },
    });
    if (data?.signup?.token) {  
      localStorage.setItem('authToken', data.signup.token);
      return data;
    }
    throw new Error('Failed to sign up');
  } catch (error) {
    console.error('Signup error', error);
    throw error;
  }
};
