import React,{Fragment} from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from '../actions/auth'
const Header = ({isAuthenticated,logout}) => {
  const guestLinks = (
    <Fragment>
      <li className="nav-link">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-link">
        <Link to="/login">Login</Link>
      </li>
      <li className="nav-link">
        <Link to="/register">Register</Link>
      </li>
    </Fragment>
  );
  const authLinks = (
    <li className="nav-link">
      <Link to="/login" onClick={logout}>Log Out</Link>
    </li>
  );
  return (
    <header className="clearfix">
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      <ul className="nav-list ml-auto">
        {isAuthenticated?authLinks:guestLinks}
        </ul>
    </header>
  );
};

Header.propTypes ={
  isAuthenticated : PropTypes.bool,
  logout :PropTypes.func.isRequired,
}
const mapStateToProps=(state)=>({
isAuthenticated : state.auth.isAuthenticated
});
export default connect(mapStateToProps,{logout})(Header);
