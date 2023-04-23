import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './store/posts.reducer';
import { POSTS } from './store/features.const';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffect } from './store/posts.effect';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsDashboardComponent } from './posts-dashboard/posts-dashboard.component';

@NgModule({
  declarations: [
    PostsListComponent,
    PostFormComponent,
    PostDetailsComponent,
    PostsDashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POSTS, postsReducer),
    EffectsModule.forFeature([PostsEffect]),
  ],
  exports: [PostsDashboardComponent],
})
export class PostsModule {}
