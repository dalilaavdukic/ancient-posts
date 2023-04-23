import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { Post } from '@app/models/post.model';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectPosts } from '../store/posts.selector';
import { invokePostsQuery } from '../store/posts.action';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsDashboardComponent {
  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  posts: Post[] = [];
  error?: ApolloError;
  loading = true;
  private storeSubscription: Subscription;

  ngOnInit() {
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
