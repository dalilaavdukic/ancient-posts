import { createFeatureSelector } from '@ngrx/store';
import { POSTS } from './features.const';
import { PostsFeatureState } from '@app/models/posts.feature.state.model';

export const selectPosts = createFeatureSelector<PostsFeatureState>(POSTS);
