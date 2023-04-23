import { ApolloError } from '@apollo/client/core';
import { Post } from './post.model';

export class PostsFeatureState {
  allPosts: Post[];
  loading: boolean;
  error?: ApolloError;
}
