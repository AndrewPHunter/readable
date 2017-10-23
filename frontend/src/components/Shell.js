import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link, matchPath, withRouter} from 'react-router-dom';
import startcase from 'lodash.startcase';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import FontIcon from 'react-md/lib/FontIcons';
import {ListItem} from 'react-md/lib/Lists';

import './shell.css';

class Shell extends PureComponent{

  static propTypes = {
    title: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,

  };

  pageTitleFromPath = (location)=>{
    const path = location.split('/');

    const page = (path[1]==='posts') ?
      'post' :
      path.pop() || 'home';

    return startcase(page);
  };

  buildNavText = ({leftIcon, route, text, match}, pathname)=>(
    <ListItem
      className={!!matchPath(pathname, match)?'active':''}
      key={route}
      leftIcon={<FontIcon>{leftIcon}</FontIcon>}
      primaryText={<Link to={route}>{text}</Link>}
    />
  );

  mapCategoriesToNavItems = (categories, pathname)=>
    categories.map(category=>(
      this.buildNavText({
        route: `/categories/${category}`,
        text: startcase(category),
        match:{path:`/categories/${category}`}
      },
      pathname
      )
    ));

  buildCategories = (categories, pathname)=>(
    <ListItem
      key="Categories"
      className={!!matchPath(pathname, {path:'/categories/:category'})?'active-group':''}
      leftIcon={<FontIcon>view_list</FontIcon>}
      primaryText="Categories"
      nestedItems={this.mapCategoriesToNavItems(categories, pathname)}
    />
  );

  buildSideNav = (categories, pathname)=>([
    this.buildNavText({leftIcon:'home', route:'/', text:'Home', match:{path: '/', exact:true}}, pathname),
    this.buildCategories(categories, pathname),
    this.buildNavText({leftIcon:'add_circle_outline', route:'/post/newPost', text:'Write Post', match: {path: '/post/newPost'}}, pathname)
  ]);

  render(){

    const {title, location, categories, children} = this.props;
    const pageTitle = this.pageTitleFromPath(location.pathname);
    const sideNav = this.buildSideNav(categories, location.pathname);

    return(
      <NavigationDrawer
        drawerTitle={title}
        toolbarTitle={pageTitle}
        contentClassName="md-grid"
        navItems={sideNav}
      >
        {children}
      </NavigationDrawer>
    );
  }
}

export default withRouter(Shell);
