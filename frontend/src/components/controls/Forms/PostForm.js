import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TextField} from 'react-md/lib/TextFields';
import {Autocomplete} from 'react-md/lib/Autocompletes';
import {Divider} from 'react-md/lib/Dividers';
import {Button} from 'react-md/lib/Buttons';

import {
  generateId,
  generateTimeStamp
} from '../../../utilities/helpers';

import './form.css';

class PostForm extends Component{

  static propTypes = {
    post: PropTypes.object,
    categories: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  static defaultProps = {
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

  state = {
    post: {
      ...this.props.post
    }
  };

  onFieldUpdate = (field)=>{
    const post = {
      ...this.state.post,
      ...field
    };
    this.setState({post});
  };

  render(){
    const {post} = this.state;
    const {categories, onSave, onCancel} = this.props;

    return (
      <form onSubmit={() => {
        post.timestamp = generateTimeStamp();
        onSave(post);
      }}>
        <div className='md-grid'>
          <TextField id='title'
                     className='md-cell md-cell--12 md-cell--bottom'
                     label='Title'
                     placeholder='Title'
                     value={post.title}
                     onChange={(value) => this.onFieldUpdate({title: value})}
          />
          <TextField id='author'
                     className='md-cell md-cell--4 md-cell--bottom'
                     label='Author'
                     placeholder='Author'
                     value={post.author}
                     onChange={(value) => this.onFieldUpdate({author: value})}
          />
          <Autocomplete id='category'
                        className='md-cell md-cell--4 md-cell--bottom'
                        placeholder='Category'
                        inline
                        value={post.category}
                        data={categories}
                        onChange={(value)=>this.onFieldUpdate({category: value})}
                        onAutocomplete={(value)=>this.onFieldUpdate({category: value})}
          />
          <TextField id='date'
                     className='md-cell md-cell--4 md-cell--bottom'
                     placeholder='Date'
                     disabled
                     value={new Date(post.timestamp).toLocaleDateString()}
                     onChange={(value) => this.onFieldUpdate({timestamp: value})}
          />
          <TextField id='body'
                     className='md-cell md-cell--12 md-cell--bottom'
                     placeholder='Body'
                     rows={20}
                     value={post.body}
                     onChange={(value) => this.onFieldUpdate({body: value})}
          />
          <Divider/>
          <div className='md-cell md-cell--12 md-cell--bottom commands'>
            <Button raised className='save' onClick={onSave.bind(null, this.state.post)}>Save</Button>
            <Button raised className='cancel' onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </form>
    );
  }
}

export default PostForm;
