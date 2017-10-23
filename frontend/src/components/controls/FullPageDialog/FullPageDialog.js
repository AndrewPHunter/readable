import React from 'react';
import PropTypes from 'prop-types';

import {Toolbar} from 'react-md/lib/Toolbars';
import {DialogContainer} from 'react-md/lib/Dialogs';
import {Button} from 'react-md/lib/Buttons';

const FullPageDialog = ({
                          title,
                          visible,
                          pageX,
                          pageY,
                          onDismiss,
                          children
                        })=>(
  <DialogContainer
    id='full-page-dialog'
    visible={visible}
    pageX={pageX}
    pageY={pageY}
    fullPage
    onHide={onDismiss}
    aria-label={title}
  >
    <Toolbar
      fixed
      colored
      title={title}
      nav={<Button icon onClick={onDismiss}>close</Button>}
    />
    <section className='md-toolbar-relative'>
      {children}
    </section>
  </DialogContainer>
);

FullPageDialog.propTypes = {
  title:PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  pageX: PropTypes.number.isRequired,
  pageY: PropTypes.number.isRequired,
  onDismiss: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default FullPageDialog;
