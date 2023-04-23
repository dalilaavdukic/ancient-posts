import { Injectable } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { Mutations } from '@app/graphql/posts.mutations';
import { Queries } from '@app/graphql/posts.queries';
import { Post } from '@app/models/post.model';
import { Result } from '@app/models/result.model';
import { Apollo } from 'apollo-angular';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private apollo: Apollo) {}

  private handleError(error: ApolloError) {
    return of({
      error,
    });
  }

  getAllPosts(): Observable<Result<Post[]>> {
    return this.apollo
      .watchQuery<any>({
        query: Queries.GET_POSTS,
      })
      .valueChanges.pipe(
        map((result) => ({ data: result.data?.posts?.data })),
        catchError((error) => this.handleError(error))
      );
  }

  createPost(post: Post): Observable<Result<Post>> {
    return this.apollo
      .mutate<any>({
        mutation: Mutations.CREATE_POST,
        variables: {
          title: post.title,
          body: post.body,
        },
      })
      .pipe(
        map((result) => ({ data: result?.data?.createPost })),
        catchError((error) => this.handleError(error))
      );
  }

  updatePost(post: Post): Observable<Result<Post>> {
    return this.apollo
      .mutate<any>({
        mutation: Mutations.UPDATE_POST,
        variables: { ...post },
      })
      .pipe(
        map((result) => ({ data: result?.data?.updatePost })),
        catchError((error) => this.handleError(error))
      );
  }

  deletePost(id: string): Observable<Result<any>> {
    return this.apollo
      .mutate<any>({
        mutation: Mutations.DELETE_POST,
        variables: { id },
      })
      .pipe(
        map(() => ({ data: id })),
        catchError((error) => this.handleError(error))
      );
  }
}
