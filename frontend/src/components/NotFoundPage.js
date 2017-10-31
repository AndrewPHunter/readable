import React from 'react';
import {Link} from 'react-router-dom';
import {Paper} from 'react-md/lib/Papers';
import {Media} from 'react-md/lib/Media';
import {Button} from 'react-md/lib/Buttons'
import {FontIcon} from 'react-md/lib/FontIcons'

import notFound from './NotFoundPage.jpg';
import './notFoundPage.css';

const NotFoundPage = ()=>(
  <Paper className='notfound-page' zDepth={1}>
    <div className='md-grid'>
      <div className='md-cell md-cell--12'>
        <h1>Post not found</h1>
      </div>
      <Paper className='md-cell md-cell--12 md-grid'>
        <section className='md-cell md-cell--5'>
          <Media>
            <img src={notFound} alt='Post Not Found'/>
          </Media>
        </section>
        <section className='md-cell md-cell--7 md-grid'>
          <div className='md-cell md-cell--12'>
            <h3>OOPS!</h3>
            <p>
              Sometimes despite our best intentions we all succumb to dysentery. But don't worry - it can happen
              to the best of us - and it just happened to you.
            </p>
            <p>
              Why don't you try again!
            </p>
          </div>
          <div className='md-cell md-cell--12 link-home'>
            <Button raised iconEl={<FontIcon>home</FontIcon>}>
              <Link to='/' className=''>Home</Link>
            </Button>
          </div>
        </section>
      </Paper>
    </div>
  </Paper>
);

export default NotFoundPage;
