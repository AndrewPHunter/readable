import {
  LOAD_ALL_POSTS,
  LOAD_POSTS_FOR_CATEGORY,
  LOAD_POST,
  ADD_POST,
  EDIT_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  DELETE_POST
} from '../actions/post.actions';

//all functions exported for testing purposes

export const loadPosts = (state, {posts})=>posts;

export const loadPostsForCategory = (state, {posts})=>([
  ...state.filter(item=>posts[0] && posts[0].category && item.category !== posts[0].category),
  //this is a null guard for the spread operator to ensure proper array shape on the event of a null object
  ...(posts || [])
]);


export const addPost = (state, {post})=>([
  ...state,
  post
]);

export const editPost = (state, {post})=>([
  ...state.filter(item=>post && item.id !== post.id),
  //this is a null guard for the spread operator to ensure proper array shape on the event of a null object
  ...(post && [post] || []) // eslint-disable-line no-mixed-operators
]);

const reducer = {
  [LOAD_ALL_POSTS]: loadPosts,
  [LOAD_POSTS_FOR_CATEGORY]: loadPostsForCategory,
  [LOAD_POST]: editPost,
  [ADD_POST]: addPost,
  [EDIT_POST]: editPost,
  [UPVOTE_POST]: editPost,
  [DOWNVOTE_POST]: editPost,
  [DELETE_POST]: editPost
};

export default (state=[], {type, ...action})=>
  reducer[type] ? reducer[type](state, action) : state;
