import React from 'react';
import PropTypes from 'prop-types';

import {ExpansionList, ExpansionPanel} from 'react-md/lib/ExpansionPanels';
import {FontIcon} from 'react-md/lib/FontIcons';
import {Button} from 'react-md/lib/Buttons';

import './postCommentPage.css';

const Footer = ({onAddComment})=>(
  <div className="md-divider-border md-divider-border--top">
    <footer className="md-grid">
      <div className="md-cell md-cell--12 comment-footer--commands">
        <Button onClick={onAddComment}
                raised
                iconEl={<FontIcon>add_circle</FontIcon>}
        >
          Add Comment
        </Button>
      </div>
    </footer>
  </div>
);

const PostCommentPage = ({comments, upVote, downVote, addComment, editComment, deleteComment})=>(
  <ExpansionList className="md-cell md-cell--12">
    <ExpansionPanel label="Comments"
                    defaultExpanded
                    footer={<Footer onAddComment={addComment}/>}
    >
      <ul className="comment-list">
        {comments.map(comment=>(
          <li key={comment.id} className="md-divider-border md-divider-border--bottom">
            <div className="md-grid">
              <div className="md-cell md-cell--4">
                <h3>{comment.author}</h3>
                <p>{new Date(comment.timestamp).toLocaleDateString()}</p>
              </div>
              <div className="md-cell md-cell--4-offset md-cell--4 comment-list--vote">
                <ul className="">
                  <li><FontIcon onClick={upVote.bind(null, comment.id)} className="thumb-up md-pointer--hover">thumb_up</FontIcon></li>
                  <li><h5>{comment.voteScore}</h5></li>
                  <li><FontIcon onClick={downVote.bind(null, comment.id)} className="thumb-down md-pointer--hover">thumb_down</FontIcon></li>
                </ul>
              </div>
              <div className="md-cell md-cell--12">
                <p>{comment.body}</p>
              </div>
              <div className="md-cell md-cell--12 comment-list--commands">
                <Button className="edit"
                        raised
                        iconBefore
                        iconEl={<FontIcon>mode_edit</FontIcon>}
                        onClick={(e)=>editComment(e, comment)}
                >
                  Edit
                </Button>
                <Button className="delete"
                        raised
                        iconBefore
                        iconEl={<FontIcon>delete</FontIcon>}
                        onClick={deleteComment.bind(null, comment.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ExpansionPanel>
  </ExpansionList>
);

PostCommentPage.propTypes = {
  comments: PropTypes.array.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default PostCommentPage;
