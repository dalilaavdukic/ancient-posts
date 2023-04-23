import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { PostsService } from '../posts.service';
import {
  createPostMutationSuccess,
  deletePostMutationSuccess,
  invokeCreatePostMutation,
  invokeDeletePostMutation,
  invokePostsQuery,
  invokeUpdatePostMutation,
  postsAPIQuerySuccess,
  updatePostMutationSuccess,
} from './posts.action';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { selectPosts } from './posts.selector';

@Injectable()
export class PostsEffect {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store
  ) {}

  loadAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokePostsQuery),
      withLatestFrom(this.store.pipe(select(selectPosts))),
      mergeMap(([, postsFromStore]) => {
        if (postsFromStore.allPosts.length > 0) {
          return EMPTY;
        }
        return this.postsService
          .getAllPosts()
          .pipe(
            map(({ data, loading, error }) =>
              postsAPIQuerySuccess({ allPosts: data, loading, error })
            )
          );
      })
    )
  );

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeCreatePostMutation),
      switchMap((action) =>
        this.postsService
          .createPost(action.newPost)
          .pipe(
            map((result) =>
              createPostMutationSuccess({ newPost: result.data! })
            )
          )
      )
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeletePostMutation),
      switchMap((action) =>
        this.postsService
          .deletePost(action.id)
          .pipe(map(() => deletePostMutationSuccess({ id: action.id })))
      )
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdatePostMutation),
      switchMap((action) =>
        this.postsService
          .updatePost(action.updatePost)
          .pipe(
            map((result) =>
              updatePostMutationSuccess({ updatePost: result.data! })
            )
          )
      )
    );
  });
}
