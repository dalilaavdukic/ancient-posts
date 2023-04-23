import { ApolloError } from '@apollo/client/errors';

export type Result<T> = {
  data?: T;
  error?: ApolloError;
};
