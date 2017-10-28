import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TextField} from 'react-md/lib/TextFields';
import {Divider} from 'react-md/lib/Dividers';
import {Button} from 'react-md/lib/Buttons';

import {
  generateTimeStamp,
  stringFormFieldRequired
} from '../../../utilities/helpers';

import './form.css';

class CommentForm extends Component{

  static propTypes = {
    comment: PropTypes.object,
    parentId: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  static defaultProps = {
    comment: {
      parentId: '',
      timestamp: generateTimeStamp(),
      body:'',
      author:'',
      voteScore:0,
      deleted: false,
      parentDeleted: false
    }
  };

  static validation = {
    author: (author)=>stringFormFieldRequired(author),
    body: (body)=>stringFormFieldRequired(body)
  };

  state = {
    comment:{
      ...CommentForm.defaultProps.comment,
      'parentId': this.props.parentId,
      ...this.props.comment
    },
    errors:{
      author:false,
      body:false
    }
  };

  validateField = (field)=>{
    const updatedField = Object.keys(field)[0];
    const updatedValue = field[updatedField];
    const isValid =
      CommentForm.validation[updatedField] ?
        CommentForm.validation[updatedField](updatedValue) : true;

    return {
      [updatedField] : !isValid
    }
  };

  onFieldUpdate = (field)=>{
    const comment = {
      ...this.state.comment,
      ...field
    };

    const errors = {
      ...this.state.errors,
      ...this.validateField(field)
    };

    this.setState({comment, errors});

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
    const {comment, errors} = this.state;
    const errorState = Object
      .keys(errors)
      .reduce((formState, key)=>{
        return {
          ...formState,
          ...this.validateField({[key]: comment[key]})
        }
      }, {});

    return new Promise((resolve)=>{
      this.setState({errors: errorState}, ()=>{
        resolve(this.isFormValid());
      });
    });
  };

  render(){
    const {comment, errors} = this.state;
    const {onSave, onCancel} = this.props;

    return(
      <form onSubmit={async (e)=>{
        e.preventDefault();
        comment.timestamp = generateTimeStamp();
        const isValid = await this.validateForm();
        if(isValid) {
          onSave(comment);
        }
      }}
      >
        <div className='md-grid'>
          <TextField id='author'
                     className='md-cell md-cell--6 md-cell--bottom'
                     label='Author'
                     placeholder='Author'
                     error={errors.author}
                     value={comment.author}
                     onChange={(value) => this.onFieldUpdate({author: value})}
                     errorText='Please provide an author'
          />
          <TextField id='date'
                     className='md-cell md-cell--6 md-cell--bottom'
                     placeholder='Date'
                     disabled
                     value={new Date(comment.timestamp).toLocaleDateString()}
                     onChange={(value) => this.onFieldUpdate({timestamp: value})}
                     errorText='This is for alignment only'
          />
          <TextField id='comment'
                     className='md-cell md-cell--12 md-cell--bottom'
                     placeholder='Comment'
                     rows={10}
                     value={comment.body}
                     error={errors.body}
                     onChange={(value) => this.onFieldUpdate({body: value})}
                     errorText='Please provide a comment'
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

export default CommentForm;
