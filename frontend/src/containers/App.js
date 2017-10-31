import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import sortBy from 'sort-by';

import Shell from '../components/Shell';
import LoadingDialog from '../components/LoadingDialog';
import HomePage from './HomePage';
import CategoryPostPage from './CategoryPostPage';
import NewPostPage from './NewPostPage';
import DeletedPostHandler from './DeletedPostHandler';
import NotFoundPage from '../components/NotFoundPage';

import {loadCategories} from '../actions/category.actions';
import {loadAll, loadCommentCount} from '../actions/post.actions';

import './App.css';


class App extends Component {

  state = {
    isLoading: true
  };

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    loadCategories: PropTypes.func.isRequired,
    loadPosts: PropTypes.func.isRequired,
    loadCommentCount: PropTypes.func.isRequired
  };

  componentDidMount = async ()=>{
    const {loadCategories, loadPosts, loadCommentCount} = this.props;
    await Promise.all([loadCategories(), loadPosts(), loadCommentCount()]);
    this.setState({isLoading:false});
  };

  render() {
    const {isLoading} = this.state;
    const {categories} = this.props;
    return (
      <BrowserRouter>
        <Shell title="Readable"
               categories={categories}
        >
          <LoadingDialog visible={isLoading}/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/categories/:category" component={CategoryPostPage}/>
            <Route exact path="/post/newPost" component={NewPostPage}/>
            <Route path="/:category/:id" component={DeletedPostHandler}/>
            <Route path="*" component={NotFoundPage}/>
          </Switch>
        </Shell>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state)=>{

    const categories = state
      .categories
      .sort(sortBy('name'))
      .map(category => category.name);

    return {
      categories
    };
};

const mapDispatchToProps = (dispatch)=>({
  loadCategories: ()=>dispatch(loadCategories()),
  loadPosts: ()=>dispatch(loadAll()),
  loadCommentCount: ()=>dispatch(loadCommentCount())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
