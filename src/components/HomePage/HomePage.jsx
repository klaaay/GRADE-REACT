import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { WrappedNormalLoginForm } from '../login/Login.jsx'

import {
  changeUserId
} from '../../actions';


const HomePage = ({
  userId,
  onChangeUserId
}) => (
    <div>
      <TextField
        hintText="Please Key in your Github User Id."
        onChange={onChangeUserId}
      />
      <Link
        to={{
          pathname: '/result',
          query: { userId },
        }}
      >
        <RaisedButton label="Submit" primary />
      </Link>
      <WrappedNormalLoginForm />
    </div>
  );

const mapStateToProps = (state) => ({
  userId: state.getIn(['github', 'userId'])
})

const mapDispatchToProps = (dispatch) => ({
  onChangeUserId: event => (
    dispatch(changeUserId(event.target.value))
  )
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);