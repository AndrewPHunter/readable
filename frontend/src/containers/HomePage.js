import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SortablePostTable} from '../components/controls';


class HomePage extends Component {
  static propTypes = {
    posts:PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.object.isRequired
  };

  onPostSelected = (id)=>
    this.props.history.push(`/posts/${id}`);

  render(){
    return(
      <SortablePostTable
        id='HomePostTable'
        rows={this.props.posts}
        rowSelected={this.onPostSelected}
      />
    );
  }
}

const mapStateToProps = (state)=>({
  posts: state.posts.filter(post=>!post.deleted)
});

export default withRouter(connect(mapStateToProps)(HomePage));
