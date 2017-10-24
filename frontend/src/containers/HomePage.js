import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SortablePostTable} from '../components/controls';
import * as postActions from '../actions/post.actions';

class HomePage extends Component {
  static propTypes = {
    posts:PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.object.isRequired
  };

  onPostSelected = (post)=>
    this.props.history.push(`/${post.category}/${post.id}`);

  render(){
    return(
      <SortablePostTable
        id='HomePostTable'
        rows={this.props.posts}
        rowSelected={this.onPostSelected}
        upVote={this.props.upVotePost}
        downVote={this.props.downVotePost}
      />
    );
  }
}

const mapStateToProps = (state)=>({
  posts: state.posts.filter(post=>!post.deleted)
});

const mapDispatchToProps = (dispatch) => ({
  upVotePost: (id)=>dispatch(postActions.upVote(id)),
  downVotePost: (id)=>dispatch(postActions.downVote(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
