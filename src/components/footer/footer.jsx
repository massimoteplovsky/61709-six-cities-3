import React from "react";
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import {Routes} from "../../consts.js";

const Footer = ({styles = {}}) => {
  return (
    <footer style={styles} className="footer container">
      <Link className="footer__logo-link" to={Routes.MAIN}>
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  );
};

Footer.propTypes = {
  styles: PropTypes.object
};

export default Footer;
