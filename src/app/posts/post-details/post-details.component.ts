import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '@app/models/post.model';
import { invokeDeletePostMutation } from '../store/posts.action';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailsComponent {
  constructor(private store: Store) {}

  @Input() post: Post;

  deletePost() {
    this.store.dispatch(
      invokeDeletePostMutation({
        id: this.post.id!,
      })
    );
  }
}
