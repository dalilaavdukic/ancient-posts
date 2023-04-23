import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { PostsService } from '../posts.service';
import {
  createPostMutationCompleted,
  deletePostMutationCompleted,
  invokeCreatePostMutation,
  invokeDeletePostMutation,
  invokePostsQuery,
  invokeUpdatePostMutation,
  postsQueryCompleted,
  setLoading,
  updatePostMutationCompleted,
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
        this.store.dispatch(setLoading({ loading: true }));
        if (postsFromStore.allPosts.length > 0) {
          return EMPTY;
        }
        return this.postsService
          .getAllPosts()
          .pipe(
            map(({ data, error }) =>
              postsQueryCompleted({ allPosts: data || [], error })
            )
          );
      })
    )
  );

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeCreatePostMutation),
      switchMap((action) => {
        this.store.dispatch(setLoading({ loading: true }));
        return this.postsService
          .createPost(action.newPost)
          .pipe(
            map(({ data, error }) =>
              createPostMutationCompleted({ newPost: data, error })
            )
          );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeletePostMutation),
      switchMap((action) => {
        this.store.dispatch(setLoading({ loading: true }));
        return this.postsService.deletePost(action.id).pipe(
          map(({ data, error }) =>
            deletePostMutationCompleted({
              id: data,
              error,
            })
          )
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdatePostMutation),
      switchMap((action) => {
        this.store.dispatch(setLoading({ loading: true }));
        return this.postsService
          .updatePost(action.updatePost)
          .pipe(
            map(({ data, error }) =>
              updatePostMutationCompleted({ updatePost: data, error })
            )
          );
      })
    );
  });
}
