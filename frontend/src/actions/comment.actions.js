import {
  getCommentsForPost,
  getComment,
  addComment,
  editComment,
  upVoteComment,
  downVoteComment,
  deleteComment as apiDelete
} from '../utilities/api';

export const LOAD_COMMENTS_FOR_POST = 'LOAD_COMMENTS_FOR_POST';
export const LOAD_COMMENT = 'LOAD_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

const loadForPostSuccess = (comments)=>({
  type: LOAD_COMMENTS_FOR_POST,
  comments
});

/**
 * Loads comments for specific post
 * @param id {String} UUID for post
 */
export const loadForPost = (id)=>(dispatch)=>
  getCommentsForPost(id)
    .then(comments=>dispatch(loadForPostSuccess(comments)));


const loadSuccess =(comment)=>({
  type: LOAD_COMMENT,
  comment
});

/**
 * Load a specific comment
 * @param id {String} UUID of comment to load
 */
export const load = (id)=>(dispatch)=>
  getComment(id)
    .then(comment=>dispatch(loadSuccess(comment)));


const addSuccess = (comment)=>({
  type: ADD_COMMENT,
  comment
});

/**
 * Add a comment
 * @param comment {Object}
 */
export const add = (comment)=>(dispatch)=>
  addComment(comment)
    .then(comment=>dispatch(addSuccess(comment)));

const editSuccess = (comment)=>({
  type: EDIT_COMMENT,
  comment
});

/**
 * Edit a comment
 * @param comment {Object}
 */
export const edit = (comment)=>(dispatch)=>
  editComment(comment)
    .then(comment=>dispatch(editSuccess(comment)));


const upVoteSuccess = (comment)=>({
  type: UPVOTE_COMMENT,
  comment
});

/**
 * Up Vote a comment
 * @param id {String} UUID of comment
 */
export const upVote = (id)=>(dispatch)=>
  upVoteComment(id)
    .then(comment=>dispatch(upVoteSuccess(comment)));

const downVoteSuccess = (comment)=>({
  type: DOWNVOTE_COMMENT,
  comment
});

/**
 * Down Vote a comment
 * @param id {String} UUID of comment
 */
export const downVote = (id)=>(dispatch)=>
  downVoteComment(id)
    .then(comment=>dispatch(downVoteSuccess(comment)));

const deleteCommentSuccess = (comment)=>({
  type: DELETE_COMMENT,
  comment
});

/**
 * Mark a comment as deleted
 * @param id {String} UUID of comment
 */
export const deleteComment = (id)=>(dispatch)=>
  apiDelete(id)
    .then(comment=>dispatch(deleteCommentSuccess(comment)));
