import React from 'react';
import { connect } from 'react-redux';

import GithubBox from '../GithubBox/GithubBox.jsx';

const ResultPage = props => {
  if (props.status) {
    return (
      <div>
        <GithubBox data={props.data} userId={props.location.query.userId} />
      </div>
    )
  }else{
    return (
      <div>
        正在加载中...
      </div>
    )
  }
}

const mapStatetoProps = (state) => ({
  status: state.getIn(['github', 'status']),
  data: state.getIn(['github', 'data'])
})

export default connect(mapStatetoProps)(ResultPage);