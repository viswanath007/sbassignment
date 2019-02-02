import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import './App.css'
import Product from './components/Products/'
import Signin from './components/Signin';
import TopBar from './components/TopBar';

class App extends Component {

  render () {
    const {isAutherised} = this.props;
    return isAutherised ?
          (<Fragment>
            <TopBar />
            <Product />
          </Fragment>) :
        (<div className="App">
          <Signin />
        </div>)
    
  }
}

const mapStateToProps = (state) => {
  const { isAutherised } = state.user;
  return {
    isAutherised,
  };
}

export default connect(mapStateToProps, {})(App);
