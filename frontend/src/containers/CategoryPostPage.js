import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {SortablePostTable} from '../components/controls';

class CategoryPostPage extends Component{

  static propTypes = {
    posts:PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.object.isRequired
  };

  onPostSelected = (id)=>
    this.props.history.push(`/posts/${id}`);

  render(){
    return(
      <SortablePostTable
        id='CategoryPostTable'
        rows={this.props.posts}
        rowSelected={this.onPostSelected}
      />
    );
  }
}

const mapStateToProps = (state, {match})=>({
  posts: state.posts.filter(post => (!post.deleted && post.category === match.params.category))
});

export default withRouter(connect(mapStateToProps)(CategoryPostPage));
