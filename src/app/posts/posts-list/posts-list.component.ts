import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '@app/models/post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent {
  @Input() posts: Post[] = [];
}
