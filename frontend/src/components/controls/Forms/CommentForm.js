import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TextField} from 'react-md/lib/TextFields';
import {Divider} from 'react-md/lib/Dividers';
import {Button} from 'react-md/lib/Buttons';

import {
  generateTimeStamp
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

  state = {
    comment: {
      ...CommentForm.defaultProps.comment,
      ...this.props.comment
    }
  };

  onFieldUpdate = (field)=>{
    const comment = {
      ...this.state.comment,
      ...field
    };
    this.setState({comment});
  };

  render(){
    const {comment} = this.state;
    const {onSave, onCancel} = this.props;

    return(
      <form onSubmit={()=>{
        comment.timestamp = generateTimeStamp();
        onSave(comment);
      }}
      >
        <div className='md-grid'>
          <TextField id='author'
                     className='md-cell md-cell--6 md-cell--bottom'
                     label='Author'
                     placeholder='Author'
                     value={comment.author}
                     onChange={(value) => this.onFieldUpdate({author: value})}
          />
          <TextField id='date'
                     className='md-cell md-cell--6 md-cell--bottom'
                     placeholder='Date'
                     disabled
                     value={new Date(comment.timestamp).toLocaleDateString()}
                     onChange={(value) => this.onFieldUpdate({timestamp: value})}
          />
          <TextField id='comment'
                     className='md-cell md-cell--12 md-cell--bottom'
                     placeholder='Comment'
                     rows={10}
                     value={comment.body}
                     onChange={(value) => this.onFieldUpdate({body: value})}
          />
          <Divider/>
          <div className='md-cell md-cell--12 md-cell--bottom commands'>
            <Button raised className='save' onClick={onSave.bind(null, this.state.comment)}>Save</Button>
            <Button raised className='cancel' onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </form>
    );
  }
}

export default CommentForm;
