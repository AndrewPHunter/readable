import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {SortablePostTable} from '../components/controls';
import {doesExist} from '../utilities/helpers';
import * as postActions from '../actions/post.actions';

class CategoryPostPage extends Component{

  static propTypes = {
    posts:PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.object.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired,
    deletePost:  PropTypes.func.isRequired
  };

  onPostSelected = (post)=>
    this.props.history.push(`/${post.category}/${post.id}`);

  render(){
    return(
      <SortablePostTable
        id='CategoryPostTable'
        rows={this.props.posts}
        rowSelected={this.onPostSelected}
        upVote={this.props.upVotePost}
        downVote={this.props.downVotePost}
        deletePost={this.props.deletePost}
      />
    );
  }
}

const mapStateToProps = ({posts, postCommentCount}, {match})=> {

  const postViewModel =
    posts
      .filter(post => !post.deleted && post.category === match.params.category)
      .map(post => ({
        ...post,
        'commentCount': doesExist(postCommentCount[post.id])
          ? postCommentCount[post.id]
          : 0

      }));

  return {
    posts: postViewModel
  }
};

const mapDispatchToProps = (dispatch) => ({
  upVotePost: (id)=>dispatch(postActions.upVote(id)),
  downVotePost: (id)=>dispatch(postActions.downVote(id)),
  deletePost: (id)=>dispatch(postActions.deletePost(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPostPage));
