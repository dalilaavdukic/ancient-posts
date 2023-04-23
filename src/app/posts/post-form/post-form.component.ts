import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { invokeCreatePostMutation } from '../store/posts.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent {
  constructor(private store: Store) {}

  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.postForm.valid) {
      this.createPost();
    }
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
}
