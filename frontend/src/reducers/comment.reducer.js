import {
  LOAD_COMMENTS_FOR_POST,
  LOAD_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  DELETE_COMMENT
} from '../actions/comment.actions';
import {downVoteComment} from "../utilities/api";

//all functions exported for testing

export const loadComments = (state, {comments})=>([
  //this is a null guard for the spread operator to ensure proper array shape on the event of a null object
  ...(comments || [])
]);

export const loadComment = (state, {comment})=>([
  ...state.filter(item=>comment && item.id !== comment.id),
  //this is a null guard for the spread operator to ensure proper array shape on the event of a null object
  ...(comment && [comment] || []) //eslint-disable-line no-mixed-operators
]);

export const addComment = (state, {comment})=>([
  ...state,
  comment
]);

export const editComment = (state, {comment})=>([
  ...state.filter(item=>comment && item.id !== comment.id),
  //this is a null guard for the spread operator to ensure proper array shape on the event of a null object
  ...(comment && [comment] || []) //eslint-disable-line no-mixed-operators
]);

const reducer = {
  [LOAD_COMMENTS_FOR_POST]: loadComments,
  [LOAD_COMMENT]: loadComment,
  [ADD_COMMENT]:addComment,
  [EDIT_COMMENT]: editComment,
  [UPVOTE_COMMENT]:editComment,
  [DOWNVOTE_COMMENT]:editComment,
  [DELETE_COMMENT]:editComment
};

export default (state=[], {type, ...action})=>
  reducer[type] ? reducer[type](state, action) : state;
