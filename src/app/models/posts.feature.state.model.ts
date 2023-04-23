import { ApolloError } from '@apollo/client/core';
import { Post } from './post.model';

export type PostsFeatureState = {
  allPosts: Post[];
  selectedPost?: Post;
  loading: boolean;
  error?: ApolloError;
};
