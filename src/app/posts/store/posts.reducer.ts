import { createReducer, on } from '@ngrx/store';
import {
  createPostMutationSuccess,
  deletePostMutationSuccess,
  postsAPIQuerySuccess,
  setSelectedPost,
  updatePostMutationSuccess,
} from './posts.action';
import { PostsFeatureState } from '@app/models/posts.feature.state.model';

export const initialState: PostsFeatureState = {
  allPosts: [],
  selectedPost: undefined,
  loading: true,
  error: undefined,
};

export const postsReducer = createReducer(
  initialState,
  on(postsAPIQuerySuccess, (state, { allPosts, loading, error }) => {
    return {
      ...state,
      allPosts,
      loading,
      error,
    };
  }),
  on(createPostMutationSuccess, (state, { newPost }) => {
    return {
      ...state,
      allPosts: [newPost, ...state.allPosts],
    };
  }),
  on(updatePostMutationSuccess, (state, { updatePost }) => {
    let newPostsState = state.allPosts.filter(
      (post) => post.id !== updatePost.id
    );
    newPostsState.unshift(updatePost);
    return {
      ...state,
      allPosts: newPostsState,
    };
  }),
  on(deletePostMutationSuccess, (state, { id }) => {
    return {
      ...state,
      allPosts: state.allPosts.filter((post) => post.id !== id),
    };
  }),
  on(setSelectedPost, (state, { post }) => {
    return {
      ...state,
      selectedPost: post,
    };
  })
);
