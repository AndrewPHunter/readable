import {
  getPosts,
  getPostsForCategory,
  getPost,
  addPost,
  editPost,
  upVotePost,
  downVotePost,
  deletePost as apiDelete
} from '../utilities/api';


export const LOAD_ALL_POSTS = 'LOAD_ALL_POSTS';
export const LOAD_POSTS_FOR_CATEGORY = 'LOAD_POSTS_FOR_CATEGORY';
export const LOAD_POST = 'LOAD_POST';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const DELETE_POST = 'DELETE_POST';


const loadAllSuccess = (posts)=>({
  type: LOAD_ALL_POSTS,
  posts
});

/**
 * Load all posts
 */
export const loadAll = ()=>(dispatch)=>
  getPosts()
    .then(posts=>dispatch(loadAllSuccess(posts)));

const loadCategorySuccess = (posts)=>({
  type: LOAD_POSTS_FOR_CATEGORY,
  posts
});


/**
 * Load a post based on category id
 * @param id {String} UUID of category
 */
export const loadForCategory = (id)=>(dispatch)=>
  getPostsForCategory(id)
    .then(posts=>dispatch(loadCategorySuccess(posts)));

const loadSuccess = (post)=>({
  type: LOAD_POST,
  post
});


/**
 * Load a specific post
 * @param id {String} UUID of post
 */
export const load = (id)=>(dispatch)=>
  getPost(id)
    .then(post=>dispatch(loadSuccess(post)));

const addSuccess = (post)=>({
  type: ADD_POST,
  post
});


/**
 * Add a new post
 * @param post {Object}
 */
export const add = (post)=>(dispatch)=>
  addPost(post)
    .then(post=>dispatch(addSuccess(post)));

const editSuccess = (post)=>({
  type: EDIT_POST,
  post
});

/**
 * Edit a post
 * @param post {Object}
 */
export const edit = (post)=>(dispatch)=>
  editPost(post)
    .then(post=>dispatch(editSuccess(post)));


const upVoteSuccess = (post)=>({
  type: UPVOTE_POST,
  post
});

/**
 * UP Vote a post
 * @param id {String} UUID of post
 */
export const upVote = (id)=>(dispatch)=>
  upVotePost(id).then(post=>dispatch(upVoteSuccess(post)));

const downVoteSuccess = (post)=>({
  type: DOWNVOTE_POST,
  post
});

/**
 * Down Vote a post
 * @param id {String} UUID of post
 */
export const downVote = (id)=>(dispatch)=>
  downVotePost(id).then(post=>dispatch(downVoteSuccess(post)));

const deletePostSuccess = (post)=>({
  type: DELETE_POST,
  post
});

/**
 * Mark a post as deleted
 * @param id {String} UUID of post
 */
export const deletePost = (id)=>(dispatch)=>
  apiDelete(id).then(post=>dispatch(deletePostSuccess(post)));
