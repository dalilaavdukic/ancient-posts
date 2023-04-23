import { createReducer, on } from '@ngrx/store';
import {
  createPostMutationCompleted,
  deletePostMutationCompleted,
  postsQueryCompleted,
  setLoading,
  setSelectedPost,
  updatePostMutationCompleted,
} from './posts.action';
import { PostsFeatureState } from '@app/models/posts.feature.state.model';

export const initialState: PostsFeatureState = {
  allPosts: [],
  selectedPost: undefined,
  loading: false,
  error: undefined,
};

export const postsReducer = createReducer(
  initialState,
  on(postsQueryCompleted, (state, { allPosts, error }) => {
    return {
      ...state,
      error,
      loading: false,
      allPosts,
    };
  }),
  on(createPostMutationCompleted, (state, { newPost, error }) => {
    const newPosts = newPost ? [newPost, ...state.allPosts] : state.allPosts;
    return {
      ...state,
      loading: false,
      error,
      selectedPost: newPost,
      allPosts: newPosts,
    };
  }),
  on(updatePostMutationCompleted, (state, { updatePost, error }) => {
    let newPosts = state.allPosts;
    if (updatePost) {
      newPosts = [
        updatePost,
        ...state.allPosts.filter((post) => post.id !== updatePost?.id),
      ];
    }
    return {
      ...state,
      error,
      loading: false,
      allPosts: newPosts,
    };
  }),
  on(deletePostMutationCompleted, (state, { id, error }) => {
    return {
      ...state,
      error,
      loading: false,
      allPosts: state.allPosts.filter((post) => post.id !== id),
    };
  }),
  on(setSelectedPost, (state, { post }) => {
    return {
      ...state,
      selectedPost: post,
    };
  }),
  on(setLoading, (state, { loading }) => {
    return {
      ...state,
      loading,
    };
  })
);
