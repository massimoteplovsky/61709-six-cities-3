import * as React from "react";
import {Link} from "react-router-dom";
import {Routes} from "../../consts";

type Props = {
  styles?: object
}

const Footer: React.FC<Props> = (props: Props) => {
  const {styles = {}} = props;
  return (
    <footer style={styles} className="footer container">
      <Link className="footer__logo-link" to={Routes.MAIN}>
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  );
};

export default Footer;
