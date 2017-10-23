import React from 'react';
import PropTypes from 'prop-types';

import {ExpansionList, ExpansionPanel} from 'react-md/lib/ExpansionPanels';
import {FontIcon} from 'react-md/lib/FontIcons';
import {Button} from 'react-md/lib/Buttons';

import './postDetailPage.css';

const Footer = ({id, voteScore, upVote, downVote, onEdit, onDelete})=>(
  <div className="md-divider-border md-divider-border--top postDetail-footer">
    <footer className="md-grid">
      <div className="md-cell md-cell--4 postDetail-footer--vote">
        <h3>{voteScore}</h3>
        <FontIcon className="thumbUp md-pointer--hover" onClick={upVote.bind(null, id)}>thumb_up</FontIcon>
        <FontIcon className="thumbDown md-pointer--hover" onClick={downVote.bind(null, id)}>thumb_down</FontIcon>
      </div>
      <div className="md-cell md-cell--4 md-cell--4-offset postDetail-footer--edit">
        <Button className="edit"
                raised
                iconBefore
                iconEl={<FontIcon>mode_edit</FontIcon>}
                onClick={onEdit}
        >
          Edit
        </Button>
        <Button className="delete"
                raised
                iconBefore
                iconEl={<FontIcon>delete</FontIcon>}
                onClick={onDelete.bind(null, id)}
        >
          Delete
        </Button>
      </div>
    </footer>
  </div>
);

const PostDetailPage = ({post, upVote, downVote, onEdit, onDelete}) => (

  <ExpansionList className="md-cell md-cell--12 postDetail">
    <ExpansionPanel label={post.title || ''}
                    secondaryLabel={`${post.author} ${new Date(post.timestamp).toLocaleDateString()}`}
                    defaultExpanded
                    footer={<Footer voteScore={post.voteScore}
                                    id={post.id}
                                    upVote={upVote}
                                    downVote={downVote}
                                    onEdit={onEdit}
                                    onDelete={onDelete}

                    />}
    >
      {post.body}
    </ExpansionPanel>
  </ExpansionList>

);

PostDetailPage.propTypes = {
  post: PropTypes.object.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default PostDetailPage;
