import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Post } from '@app/models/post.model';
import {
  invokeDeletePostMutation,
  setSelectedPost,
} from '../store/posts.action';
import { Subscription, map } from 'rxjs';
import { selectPost } from '../store/posts.selector';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  @Input() post: Post;
  storeSubscription: Subscription;
  selectedPostId?: String;

  ngOnInit() {
    this.storeSubscription = this.store
      .pipe(
        select(selectPost),
        map((selectedPost) => selectedPost?.id)
      )
      .subscribe((postId) => {
        this.selectedPostId = postId;
        this.cdr.detectChanges();
      });
  }

  deletePost() {
    this.store.dispatch(
      invokeDeletePostMutation({
        id: this.post.id!,
      })
    );
  }

  editPost() {
    this.store.dispatch(
      setSelectedPost({
        post: this.post,
      })
    );
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
