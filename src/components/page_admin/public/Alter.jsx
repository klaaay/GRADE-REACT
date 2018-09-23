import React from 'react';

import { Alert } from 'antd';

const Alter = props => {
  if (props.status === 'await') {
    return <div></div>
  }
  else if (props.status === 'failed') {
    return (
      <Alert message={props.message} type="warning" />
    )
  }
  else if (props.status === 'success') {
    return (
      <Alert message={props.message} type="success" />
    )
  }
}
export default Alter;