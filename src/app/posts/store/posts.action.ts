import { createAction, props } from '@ngrx/store';
import { Post } from '@app/models/post.model';
import { ApolloError } from '@apollo/client/errors';

export const invokePostsQuery = createAction('[Posts API] Invoke posts query');

export const postsQueryCompleted = createAction(
  '[Posts API] API posts query completed',
  props<{ allPosts: Post[]; error?: ApolloError }>()
);

export const invokeCreatePostMutation = createAction(
  '[Posts API] Invoke create post mutation',
  props<{ newPost: Post }>()
);

export const createPostMutationCompleted = createAction(
  '[Posts API] Create new post mutation completed',
  props<{ newPost?: Post; error?: ApolloError }>()
);

export const invokeUpdatePostMutation = createAction(
  '[Posts API] Inovke update post mutation',
  props<{ updatePost: Post }>()
);

export const updatePostMutationCompleted = createAction(
  '[Posts API] Update post mutation completed',
  props<{ updatePost?: Post; error?: ApolloError }>()
);

export const invokeDeletePostMutation = createAction(
  '[Posts API] Inovke delete post mutation',
  props<{ id: string }>()
);

export const deletePostMutationCompleted = createAction(
  '[Posts API] delete post mutation completed',
  props<{ id: string; error?: ApolloError }>()
);

export const setSelectedPost = createAction(
  '[Post Details] Select post',
  props<{ post: Post | undefined }>()
);

export const setLoading = createAction(
  '[Posts API] Set loading',
  props<{ loading: boolean }>()
);
