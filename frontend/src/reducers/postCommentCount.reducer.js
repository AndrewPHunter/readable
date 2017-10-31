import {LOAD_POSTS_COMMENT_COUNT} from '../actions/post.actions';
import {
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions/comment.actions';


const subtractOrZero = (value)=>
  (value - 1 > 0) ? value-1 :0;

const addCommentOrInitial = (value)=>
  value ? value + 1 : 1;

const loadCommentCount = (state, {postCommentCount})=>postCommentCount;

const addComment = (state, {comment})=>({
  ...state,
  [comment.parentId]: addCommentOrInitial(state[comment.parentId])
});

const deleteComment = (state, {comment})=>({
  ...state,
  [comment.parentId]: subtractOrZero(state[comment.parentId])
});

const reducer = {
  [LOAD_POSTS_COMMENT_COUNT]: loadCommentCount,
  [ADD_COMMENT]: addComment,
  [DELETE_COMMENT]: deleteComment
};

export default (state={}, {type, ...data})=>
  reducer[type] ? reducer[type](state, data) : state;
