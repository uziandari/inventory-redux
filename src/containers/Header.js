import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../actions';

import '../styles/navbar.css';

class Header extends Component {
  handleSignout() {
    this.props.signOutUser();
  }

  renderAuthLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/inventory"><span>View Inventory</span></Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/inventory/locations"><span>Find Locations</span></Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/returns/add"><span>Add Returns</span></Link>
        </li>,
        <li className="nav-item" key={4}>
          <Link className="nav-link" to="/returns/view"><span>View Returns</span></Link>
        </li>,
        <li className="nav-item" key={5}>
          <Link className="nav-link" to="/adjustments"><span>Search Adjustments</span></Link>
        </li>,
        <li className="nav-item" key={9}>
          <a className="nav-link" href="#" onClick={() => this.handleSignout()}><span>Sign Out</span></a>
        </li>
      ]
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login"><span>Login</span></Link>
        </li>
      ]
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to={this.props.authenticated ? "/userhome" : "/"} className="navbar-brand"><strong>rbginv</strong></Link>
          </div>
           <ul className="nav navbar-nav navbar-right">
             {this.renderAuthLinks()} 
           </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, Actions)(Header);