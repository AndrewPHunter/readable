import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {SortablePostTable} from '../components/controls';
import * as postActions from '../actions/post.actions';

class CategoryPostPage extends Component{

  static propTypes = {
    posts:PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.object.isRequired
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
      />
    );
  }
}

const mapStateToProps = (state, {match})=>({
  posts: state.posts.filter(post => (!post.deleted && post.category === match.params.category))
});

const mapDispatchToProps = (dispatch) => ({
  upVotePost: (id)=>dispatch(postActions.upVote(id)),
  downVotePost: (id)=>dispatch(postActions.downVote(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPostPage));
