import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectPosts } from '../store/posts.selector';
import { invokePostsQuery } from '../store/posts.action';
import { ApolloError } from '@apollo/client/errors';
import { Post } from '@app/models/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  posts: Post[] = [];
  error?: ApolloError;
  loading = true;
  private storeSubscription: Subscription;

  ngOnInit(): void {
    this.storeSubscription = this.store
      .pipe(select(selectPosts))
      .subscribe(({ loading, error, allPosts }) => {
        this.error = error;
        this.posts = allPosts;
        this.loading = loading;
        this.cdr.detectChanges();
      });

    this.store.dispatch(invokePostsQuery());
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
