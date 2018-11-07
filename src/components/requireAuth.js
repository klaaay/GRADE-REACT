import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'

export default (ChildComponent) => {

  class ComposedComponent extends Component {

    componentDidMount = () => {
      this.shouldNavigateAway();
    }

    componentDidUpdate = () => {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        browserHistory.push('/')
      }
    }

    render() {
      return <ChildComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.getIn(['login', 'auth']),
    }
  }

  return connect(mapStateToProps)(ComposedComponent)

}