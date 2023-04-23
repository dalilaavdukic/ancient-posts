import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { PostsService } from '../posts.service';
import {
  createPostMutationSucess,
  deletePostMutationSuccess,
  invokeCreatePostMutation,
  invokeDeletePostMutation,
  invokePostsQuery,
  postsAPIQuerySuccess,
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
      mergeMap((action) => {
        return this.postsService.createPost(action.newPost).pipe(
          map((result) => {
            return createPostMutationSucess({ newPost: result.data! });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeletePostMutation),
      mergeMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map(() => {
            return deletePostMutationSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
