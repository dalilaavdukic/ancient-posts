import { createReducer, on } from '@ngrx/store';
import {
  createPostMutationSucess,
  deletePostMutationSuccess,
  postsAPIQuerySuccess,
} from './posts.action';
import { PostsFeatureState } from '@app/models/posts.feature.state.model';

export const initialState: PostsFeatureState = {
  allPosts: [],
  loading: true,
  error: undefined,
};

export const postsReducer = createReducer(
  initialState,
  on(postsAPIQuerySuccess, (state, { allPosts, loading, error }) => {
    return {
      allPosts,
      loading,
      error,
    };
  }),
  on(createPostMutationSucess, (state, { newPost }) => {
    return {
      ...state,
      allPosts: [newPost, ...state.allPosts],
    };
  }),
  on(deletePostMutationSuccess, (state, { id }) => {
    return {
      ...state,
      allPosts: state.allPosts.filter((post) => post.id !== id),
    };
  })
);
