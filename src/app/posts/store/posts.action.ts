import { createAction, props } from '@ngrx/store';
import { Post } from '@app/models/post.model';
import { PostsFeatureState } from '@app/models/posts.feature.state.model';

export const invokePostsQuery = createAction('[Posts API] Invoke posts query');

export const postsAPIQuerySuccess = createAction(
  '[Posts API] API posts query success',
  props<PostsFeatureState>()
);

export const invokeCreatePostMutation = createAction(
  '[Posts API] Invoke create post mutation',
  props<{ newPost: Post }>()
);

export const createPostMutationSucess = createAction(
  '[Posts API] Create new post mutation success',
  props<{ newPost: Post }>()
);

export const invokeDeletePostMutation = createAction(
  '[Posts API] Inovke delete post mutation',
  props<{ id: string }>()
);

export const deletePostMutationSuccess = createAction(
  '[Posts API] deleted post mutation success',
  props<{ id: string }>()
);
