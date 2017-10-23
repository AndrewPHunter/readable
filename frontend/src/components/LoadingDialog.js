import React from 'react';
import PropTypes from 'prop-types';

import DialogContainer from 'react-md/lib/Dialogs';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';

const LoadingDialog = ({visible})=>(
  <DialogContainer
    id="ProgressBar"
    title="Loading"
    visible={visible}
    focusOnMount={false}
    onHide={()=>{}}
  >
    <LinearProgress
      id="LoadingBar"
      centered
    />
  </DialogContainer>
);

LoadingDialog.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default LoadingDialog;
