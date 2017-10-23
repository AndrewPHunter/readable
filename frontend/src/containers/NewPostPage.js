import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {Paper} from 'react-md/lib/Papers';

import {PostForm} from '../components/controls';
import {generateId, generateTimeStamp} from '../utilities/helpers';
import {add} from '../actions/post.actions';

import './newPostPage.css';

class NewPostPage extends Component{

  static propTypes = {
    history: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    addPost: PropTypes.func.isRequired
  };

  state={
    post: {
      id: generateId(),
      timestamp: generateTimeStamp(),
      title:'',
      body:'',
      author:'',
      category: '',
      voteScore:0,
      deleted: false
    }
  };

  onSave = async (post)=>{
    await this.props.addPost(post);
    this.props.history.push('/');
  };

  onCancel = ()=>this.props.history.push('/');

  render(){
    const {post} = this.state;
    const {categories} = this.props;

    return(
      <Paper className='newPostPage' zDepth={1}>
        <PostForm post={post}
                  categories={categories}
                  onSave={this.onSave}
                  onCancel={this.onCancel}
        />
      </Paper>
    );
  }
}

const mapStateToProps = (state)=>({
  categories: state.categories.map(category=>category.name)
});

const mapDispatchToProps = (dispatch)=>({
  addPost: (post)=>dispatch(add(post))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPostPage))
