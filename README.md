# Readable
[React Nanodegree Project](https://www.udacity.com/course/react-nanodegree--nd019)

This project is based off of the [Readable API Server](https://github.com/udacity/reactnd-project-readable-starter) starting template
which contained the code for the backend api server that is interacted with for the development of the prject.

### Directory Structure
<p>
The project makes the decision to combine the api-server and frontend application into one central project for both ease of development and 
management of source control.  Each individual project, api-server and frontend, maintain their own dependencies and are tied together by npm
scripts found at the root of the project.
</p>
<p>
The project makes the purposeful decision of grouping reusable components into a common controls directory which are all exported by the root
index.js file for each of locating assets. An example of this can be found below:
</p>

```js
import {
  PostDetailPage,
  PostCommentPage,
  FullPageDialog,
  PostForm,
  CommentForm
} from '../components/controls'
```

### Technology Used
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [redux](http://redux.js.org/)
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* [react-redux](https://github.com/reactjs/react-redux/blob/master/docs/api.md)
* [react-router-dom](https://reacttraining.com/react-router/web/guides/philosophy)
* [react-md](https://react-md.mlaursen.com/)
* [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar)


### Getting Started
* clone the repo
* setup projects and dependencies
```sh
yarn setup
```
* start the backend and development server
```sh
yarn start
```


### Design Decisions
<p>
Overall the layout and design of the app is typical for react, redux, react-router apps. The major difference that may be noted is the concise
effort to maintain reducers that are more deterministic and easily testable by removing switch and if statements and relying specifically
on language features to maximize testability and determinism.
</p>
<p>
I am unsure if this deterministic reducer style is worth maintaining but felt it was interesting to try out for this project. An
example is found below:
</p>

```js
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

```

### API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

### Contributing

This repository is used for a nanodegree program that I am participating in so I will not be accepting pull requests.

