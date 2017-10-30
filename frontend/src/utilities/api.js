import {baseUrl} from './config';
require('dotenv').config();

const upVote = {
  "option":"upVote"
};

const downVote = {
  "option":"downVote"
};

const headers = {
  'Accept': 'application/json',
  'Authorization':'123456789'
};


/**
 * Get all categories from server
 * @returns {Promise.<Array.<Object>>} categories
 */
export const getCategories = ()=>
  fetch(`${baseUrl}/categories`, {headers})
    .then(res=>res.json())
    .then(data=>data.categories);

/**
 * Get all Posts for a category id
 * @param id {string} representing the id of the category
 * @returns {Promise.<Array.<Object>>} Posts assigned to category
 */
export const getPostsForCategory = (id)=>
  fetch(`${baseUrl}/${id}/posts`, {headers})
    .then(res=>res.json());

/**
 * Get all Posts
 * @returns {Promise.<Array.<Object>>} All posts stored
 */
export const getPosts = ()=>
  fetch(`${baseUrl}/posts`, {headers})
    .then(res=>res.json());

/**
 * Get a specific post
 * @param id {String} Post id
 * @returns {Promise.<Object>} the post requested
 */
export const getPost = (id)=>
  fetch(`${baseUrl}/posts/${encodeURI(id)}`, {headers})
    .then(res=>res.json());

/**
 * Add a new post
 * @param post {Object} representing the post
 * @returns {Promise.<Object>} the post added
 */
export const addPost = (post)=>
  fetch(`${baseUrl}/posts`, {
    method:'POST',
    headers:{
      ...headers,
      'Content-Type':'application/json'
    },
    body:JSON.stringify(post)
  }).then(res=>res.json());

/**
 * Add a point to a post "upvote"
 * @param id {String} id of post to "upvote"
 * @returns {Promise.<Object>} the edited post
 */
export const upVotePost = (id)=>
  fetch(`${baseUrl}/posts/${encodeURI(id)}`, {
    method: 'POST',
    headers:{
      ...headers,
      'Content-Type':'application/json'
    },
    body:JSON.stringify(upVote)
  }).then(res=>res.json());

/**
 * Remove a point to a post "downvote"
 * @param id {String} id of post to "downvote"
 * @returns {Promise.<Object>} the edited post
 */
export const downVotePost = (id)=>
  fetch(`${baseUrl}/posts/${encodeURI(id)}`, {
    method: 'POST',
    headers:{
      ...headers,
      'Content-Type':'application/json'
    },
    body:JSON.stringify(downVote)
  }).then(res=>res.json());

/**
 * Edit an existing post
 * @param post {Object} the post to edit
 * @returns {Promise.<Object>} edited post
 */
export const editPost = ({id, title, body, ...post})=>
  fetch(`${baseUrl}/posts/${encodeURI(id)}`, {
    method: 'PUT',
    headers:{
      ...headers,
      'Content-Type':'application/json'
    },
    body:JSON.stringify({title, body})
  }).then(res=>res.json());

/**
 * Mark a post as deleted - deleted flag for a post to 'true'.
 * @param id {String} of post to delete
 * @returns {Promise.<Object>} the post marked as deleted
 */
export const deletePost = (id)=>
  fetch(`${baseUrl}/posts/${encodeURI(id)}`, {
    method: 'DELETE',
    headers
  }).then(res=>res.json());

/**
 * Get comments for a post
 * @param id {String} of Post to get comments for
 * @returns {Promise.<Array.<Object>>} comments for post
 */
export const getCommentsForPost = (id) =>
  fetch(`${baseUrl}/posts/${encodeURI(id)}/comments`, {headers})
    .then(res => res.json());


/**
 * Get comment counts for each post
 * @returns {Promise.<Object>} containing post ids and comment counts
 */
export const getPostCommentCount = ()=>
  fetch(`${baseUrl}/comments/count`, {headers})
    .then(res=>res.json());

/**
 * Get a specific comment
 * @param id {String} of comment
 * @returns {Promise.<Object>} the comment requested
 */
export const getComment = (id) =>
  fetch(`${baseUrl}/comments/${encodeURI(id)}`, {headers})
    .then(res => res.json());

/**
 * Add a comment
 * @param comment {Object} comment to add
 * @returns {Promise.<Object>} the added comment
 */
export const addComment = (comment)=>
  fetch(`${baseUrl}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res=>res.json());

/**
 * Edit and existing comment
 * @param comment {Object} the edited comment
 * @returns {Promise.<Object>} the edited comment
 */
export const editComment = ({id, body, timestamp, ...comment})=>
  fetch(`${baseUrl}/comments/${encodeURI(id)}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type':'application/json'
    },
    body: JSON.stringify({body, timestamp})
  }).then(res=>res.json());

/**
 * Add a point to a comment "upvote"
 * @param id {String} id of comment to "upvote"
 * @returns {Promise.<Object>} the edited comment
 */
export const upVoteComment = (id)=>
  fetch(`${baseUrl}/comments/${encodeURI(id)}`, {
    method: 'POST',
    headers:{
      ...headers,
      'Content-Type':'application/json'
    },
    body:JSON.stringify(upVote)
  }).then(res=>res.json());

/**
 * Remove a point to a comment "downvote"
 * @param id {String} id of comment to "downvote"
 * @returns {Promise.<Object>} the edited comment
 */
export const downVoteComment = (id)=>
  fetch(`${baseUrl}/comments/${encodeURI(id)}`, {
    method: 'POST',
    headers:{
      ...headers,
      'Content-Type':'application/json'
    },
    body:JSON.stringify(downVote)
  }).then(res=>res.json());

/**
 * Mark a comment as deleted - deleted flag for a post to 'true'.
 * @param id {String} of comment to delete
 * @returns {Promise.<Object>} the comment marked as deleted
 */
export const deleteComment = (id)=>
  fetch(`${baseUrl}/comments/${encodeURI(id)}`, {
    method: 'DELETE',
    headers
  }).then(res=>res.json());
