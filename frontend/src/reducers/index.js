import {combineReducers} from 'redux';
import categories from './category.reducer';
import posts from './post.reducer';
import comments from './comment.reducer';
import postCommentCount from './postCommentCount.reducer';

const rootReducer = combineReducers({
  categories,
  posts,
  comments,
  postCommentCount
});

export default rootReducer;
