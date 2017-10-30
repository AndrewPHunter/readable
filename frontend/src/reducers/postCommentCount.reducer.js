import {LOAD_POSTS_COMMENT_COUNT} from '../actions/post.actions';

const loadCommentCount = ({postCommentCount})=>postCommentCount;

const reducer = {
  [LOAD_POSTS_COMMENT_COUNT]: loadCommentCount
};

export default (state={}, {type, ...data})=>
  reducer[type] ? reducer[type](data) : state;
