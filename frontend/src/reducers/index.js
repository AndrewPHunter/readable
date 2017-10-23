import {combineReducers} from 'redux';
import categories from './category.reducer';
import posts from './post.reducer';
import comments from './comment.reducer';

const rootReducer = combineReducers({
  categories,
  posts,
  comments
});

export default rootReducer;
