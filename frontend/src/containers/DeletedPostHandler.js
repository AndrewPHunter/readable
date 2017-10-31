import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ReadPostPage from './ReadPostPage';

class DeletedPostHandler extends Component{

  static propTypes = {
    post:PropTypes.object,
    history: PropTypes.object.isRequired
  };

  componentWillUpdate = (nextProps, nextState)=>{
    const {post, history} = nextProps;
    if(post === undefined){
      history.replace('/notFoundPage');
    }
  };

  render(){

    const {post} = this.props;

    if(post !== undefined){
      return (
        <ReadPostPage post={post}/>
      );
    }else{
      return(<div/>);
    }
  }
}

const mapStateToProps = ({posts}, {match})=>({
  post: posts.filter(post=>post.id === match.params.id)[0] || undefined
});

export default withRouter(connect(mapStateToProps)(DeletedPostHandler))
