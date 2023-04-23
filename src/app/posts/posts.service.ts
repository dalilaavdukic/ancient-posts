import { Injectable } from '@angular/core';
import {
  ApolloError,
  ApolloQueryResult,
  NetworkStatus,
} from '@apollo/client/core';
import { Mutations } from '@app/graphql/posts.mutations';
import { Queries } from '@app/graphql/posts.queries';
import { Post } from '@app/models/post.model';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private apollo: Apollo) {}

  getAllPosts(): Observable<ApolloQueryResult<Post[]>> {
    return this.apollo
      .watchQuery<any>({
        query: Queries.GET_POSTS,
      })
      .valueChanges.pipe(
        map((result) => ({ ...result, data: result.data?.posts?.data })),
        catchError((error: ApolloError) => {
          return of({
            data: [],
            error,
            loading: false,
            networkStatus: NetworkStatus.error,
          });
        })
      );
  }

  createPost(post: Post): Observable<MutationResult<Post>> {
    return this.apollo
      .mutate<any>({
        mutation: Mutations.CREATE_POST,
        variables: {
          title: post.title,
          body: post.body,
        },
      })
      .pipe(map((result) => ({ ...result, data: result?.data?.createPost })));
  }

  deletePost(id: string) {
    return this.apollo.mutate<any>({
      mutation: Mutations.DELETE_POST,
      variables: { id },
    });
  }
}
