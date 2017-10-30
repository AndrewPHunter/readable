import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TextField} from 'react-md/lib/TextFields';
import {Autocomplete} from 'react-md/lib/Autocompletes';
import {Divider} from 'react-md/lib/Dividers';
import {Button} from 'react-md/lib/Buttons';

import {
  generateId,
  generateTimeStamp,
  stringFormFieldRequired
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

  static validation = {
    title: (title)=>stringFormFieldRequired(title),
    body: (body)=>stringFormFieldRequired(body),
    author: (author)=>stringFormFieldRequired(author),
    category: (category)=>stringFormFieldRequired(category)
  };



  state = {
    post: {
      ...PostForm.defaultProps.post,
      ...this.props.post
    },
    errors: {
      title: false,
      body: false,
      author: false,
      category: false
    }
  };

  validateField = (field)=>{
    const updatedField = Object.keys(field)[0];
    const updatedValue = field[updatedField];
    const isValid =
      PostForm.validation[updatedField] ?
        PostForm.validation[updatedField](updatedValue) : true;

    return {
      [updatedField] : !isValid
    }
  };

  onFieldUpdate = (field)=>{

    const post = {
      ...this.state.post,
      ...field
    };

    const errors = {
      ...this.state.errors,
      ...this.validateField(field)
    };

    this.setState({post, errors});
  };

  isFormValid = ()=>{
    const {errors}= this.state;
    return(
      Object.keys(errors)
        .reduce((isValid, key)=>
          isValid && !errors[key]
          ,true)
    );
  };

  validateForm = ()=>{
    const {post, errors} = this.state;
    const errorState = Object
      .keys(errors)
      .reduce((formState, key)=>{
        return {
          ...formState,
          ...this.validateField({[key]: post[key]})
        }
      }, {});

    return new Promise((resolve)=>{
      this.setState({errors: errorState}, ()=>{
        resolve(this.isFormValid());
      });
    });
  };

  render(){
    const {post, errors} = this.state;
    const {categories, onSave, onCancel} = this.props;

    return (
      <form onSubmit={async (e) => {
        e.preventDefault();
        post.timestamp = generateTimeStamp();
        const isValid = await this.validateForm();
        if(isValid) {
          onSave(post);
        }
      }}>
        <div className='md-grid'>
          <TextField id='title'
                     className='md-cell md-cell--12 md-cell--bottom'
                     label='Title'
                     placeholder='Title'
                     error={errors.title}
                     value={post.title}
                     onChange={(value) => this.onFieldUpdate({title: value})}
                     errorText='Please provide a title'
          />
          <TextField id='author'
                     className='md-cell md-cell--4 md-cell--bottom'
                     label='Author'
                     placeholder='Author'
                     error={errors.author}
                     value={post.author}
                     onChange={(value) => this.onFieldUpdate({author: value})}
                     errorText='Please provide an author'
          />
          <Autocomplete id='category'
                        className='md-cell md-cell--4 md-cell--bottom'
                        placeholder='Category'
                        error={errors.category}
                        value={post.category}
                        data={categories}
                        onChange={(value)=>this.onFieldUpdate({category: value})}
                        onAutocomplete={(value)=>this.onFieldUpdate({category: value})}
                        errorText='Please select a category'
          />
          <TextField id='date'
                     className='md-cell md-cell--4 md-cell--bottom'
                     placeholder='Date'
                     disabled
                     value={new Date(post.timestamp).toLocaleDateString()}
                     onChange={(value) => this.onFieldUpdate({timestamp: value})}
                     errorText='For spacing only'
          />
          <TextField id='body'
                     className='md-cell md-cell--12 md-cell--bottom'
                     placeholder='Body'
                     rows={20}
                     error={errors.body}
                     value={post.body}
                     onChange={(value) => this.onFieldUpdate({body: value})}
                     errorText='Please provide a post'
          />
          <Divider/>
          <div className='md-cell md-cell--12 md-cell--bottom commands'>
            <Button raised className='save' type='submit'>Save</Button>
            <Button raised className='cancel' onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </form>
    );
  }
}

export default PostForm;
