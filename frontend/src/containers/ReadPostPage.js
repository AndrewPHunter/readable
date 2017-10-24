import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import sortBy from 'sort-by';
import * as commentActions from '../actions/comment.actions'
import * as postActions from '../actions/post.actions';

import {
  PostDetailPage,
  PostCommentPage,
  FullPageDialog,
  PostForm,
  CommentForm
} from '../components/controls'

import {generateId} from '../utilities/helpers';

class ReadPostPage extends Component{

  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    comments: []
  };

  state={
    title:'',
    visible: false,
    pageX: 0,
    pageY: 0,
    editPost: true,
    currentComment: {}
  };

  componentDidMount = ()=>{
    this.props.loadComments(this.props.post.id);
  };

  onEditPost = (e)=>{
    const {pageX, pageY} = e;
    e.preventDefault();
    this.setState({
      title: this.props.post.title,
      visible: true,
      pageX,
      pageY
    });
  };

  onUpdatePost = async (post)=>{
    await this.props.editPost(post);
    this.setState({
      title:'',
      visible: false
    });
  };

  onDeletePost = async(id)=>{
    await this.props.deletePost(id);
    this.props.history.goBack();
  };

  onEditComment = (e, comment)=>{
    const {pageX, pageY} = e;
    e.preventDefault();
    this.setState({
      title: 'Comment',
      visible: true,
      pageX,
      pageY,
      editPost: false,
      comment: comment
    });
  };

  onUpdateComment = async (comment)=>{
    if(comment.id){
      await this.props.editComment(comment);
    }else{
      comment.id = generateId();
      await this.props.addComment(comment);
    }
    this.setState({
      title:'',
      visible: false,
      editPost: true
    });
  };

  addComment = (e)=>this.onEditComment(e, null);

  onDismiss = (e)=>{
    e.preventDefault();
    this.setState({
      visible: false,
      editPost: true
    });
  };

  render(){

    const {title, visible, pageX, pageY, comment} = this.state;
    const {categories, post, deleteComment} = this.props;

    return (
      <div>
        <PostDetailPage
          post={this.props.post}
          commentCount={this.props.comments.length}
          upVote={this.props.upVotePost}
          downVote={this.props.downVotePost}
          onEdit={this.onEditPost}
          onDelete={this.onDeletePost}
        />
        <PostCommentPage
          comments={this.props.comments}
          upVote={this.props.upVoteComment}
          downVote={this.props.downVoteComment}
          addComment={this.addComment}
          editComment={this.onEditComment}
          deleteComment={deleteComment}
        />
        <FullPageDialog
          title={title}
          visible={visible}
          pageX={pageX}
          pageY={pageY}
          onDismiss={this.onDismiss}
        >
          {this.state.editPost &&
            <PostForm post={post}
                    categories={categories}
                    onSave={this.onUpdatePost}
                    onCancel={this.onDismiss}
            />
          }
          {!this.state.editPost &&
            <CommentForm comment={comment}
                         parentId={post.id}
                         onSave={this.onUpdateComment}
                         onCancel={this.onDismiss}

            />
          }
        </FullPageDialog>
      </div>
    );
  }
}

const mapStateToProps = (state, {match})=>({
  post: state.posts.filter(post=>post.id === match.params.id)[0] || {},
  comments: state.comments.filter(comment=>!comment.deleted && comment.parentId === match.params.id).sort(sortBy('-voteScore')),
  categories: state.categories.map(category=>category.name)
});

const mapDispatchToProps = (dispatch) => ({
  loadComments: (id) => dispatch(commentActions.loadForPost(id)),
  upVoteComment: (id)=> dispatch(commentActions.upVote(id)),
  downVoteComment: (id)=> dispatch(commentActions.downVote(id)),
  editComment: (comment)=>dispatch(commentActions.edit(comment)),
  addComment: (comment)=>dispatch(commentActions.add(comment)),
  deleteComment: (id)=>dispatch(commentActions.deleteComment(id)),
  upVotePost: (id)=>dispatch(postActions.upVote(id)),
  downVotePost: (id)=>dispatch(postActions.downVote(id)),
  editPost: (post)=>dispatch(postActions.edit(post)),
  deletePost: (id)=>dispatch(postActions.deletePost(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadPostPage));
