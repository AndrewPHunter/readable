import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {SortablePostTable} from '../components/controls';
import {doesExist} from '../utilities/helpers';
import * as postActions from '../actions/post.actions';

import {FullPageDialog, PostForm} from '../components/controls';

class CategoryPostPage extends Component{

  static propTypes = {
    posts:PropTypes.arrayOf(PropTypes.object),
    categories: PropTypes.arrayOf(PropTypes.string),
    history: PropTypes.object.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    deletePost:  PropTypes.func.isRequired
  };

  state = {
    post: {},
    visible: false,
    pageX: 0,
    pageY: 0,
  };

  onPostSelected = (post)=>
    this.props.history.push(`/${post.category}/${post.id}`);

  onEditPost = (e, post)=>{
    const {pageX, pageY} = e;
    e.preventDefault();
    this.setState({
      visible:true,
      pageX,
      pageY,
      post
    });
  };

  onPostUpdated = async (post)=>{
    await this.props.editPost(post);
    this.setState({
      post: {},
      visible: false
    })
  };

  onDialogDismiss = (e)=>{
    e.preventDefault();
    this.setState({
      visible: false,
      post: {}
    });
  };

  render(){
    const {posts, categories, upVotePost, downVotePost, deletePost} = this.props;
    const {post, visible, pageX, pageY} = this.state;

    return(
      <div>
        <SortablePostTable
          id='CategoryPostTable'
          rows={posts}
          rowSelected={this.onPostSelected}
          upVote={upVotePost}
          downVote={downVotePost}
          editPost={this.onEditPost}
          deletePost={deletePost}
        />
        <FullPageDialog
          title='Edit Post'
          visible={visible}
          pageX={pageX}
          pageY={pageY}
          onDismiss={this.onDialogDismiss}
        >
          <PostForm
            post={post}
            categories={categories}
            onSave={this.onPostUpdated}
            onCancel={this.onDialogDismiss}
          />
        </FullPageDialog>
      </div>
    );
  }
}

const mapStateToProps = ({posts, postCommentCount, categories}, {match})=> {

  const postViewModel =
    posts
      .filter(post => !post.deleted && post.category === match.params.category)
      .map(post => ({
        ...post,
        'commentCount': doesExist(postCommentCount[post.id])
          ? postCommentCount[post.id]
          : 0

      }));

  const categoryViewModel = categories.map(category=>category.name);

  return {
    posts: postViewModel,
    categories: categoryViewModel
  }
};

const mapDispatchToProps = (dispatch) => ({
  upVotePost: (id)=>dispatch(postActions.upVote(id)),
  downVotePost: (id)=>dispatch(postActions.downVote(id)),
  editPost: (post)=>dispatch(postActions.edit(post)),
  deletePost: (id)=>dispatch(postActions.deletePost(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPostPage));
