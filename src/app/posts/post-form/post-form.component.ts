import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  invokeCreatePostMutation,
  invokeUpdatePostMutation,
  setSelectedPost,
} from '../store/posts.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { selectPost } from '../store/posts.selector';
import { Subscription } from 'rxjs';
import { Post } from '@app/models/post.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });

  storeSubscription: Subscription;
  post?: Post;

  ngOnInit(): void {
    this.storeSubscription = this.store
      .pipe(select(selectPost))
      .subscribe((selectedPost) => {
        this.post = selectedPost;
        if (selectedPost) {
          this.postForm.setValue({
            title: selectedPost.title,
            body: selectedPost.body,
          });
        } else {
          this.postForm.reset();
        }
        this.cdr.detectChanges();
      });
  }

  onSubmit() {
    if (!this.postForm.valid) return;

    if (this.post?.id) {
      this.editPost();
    } else {
      this.createPost();
    }
  }

  onCancel() {
    this.store.dispatch(setSelectedPost({ post: undefined }));
  }

  createPost() {
    this.store.dispatch(
      invokeCreatePostMutation({
        newPost: {
          title: this.postForm.value.title!,
          body: this.postForm.value.body!,
        },
      })
    );
  }

  editPost() {
    this.store.dispatch(
      invokeUpdatePostMutation({
        updatePost: {
          id: this.post?.id,
          title: this.postForm.value.title!,
          body: this.postForm.value.body!,
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
