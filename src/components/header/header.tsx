import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthStatus, getUserInfo} from "../../selectors/user";
import {Authorization} from "../../consts";
import {BASE_URL} from "../../consts";
import {UserInfo} from "../../prop-validator/prop-validator";
import {Routes} from "../../consts";

interface Props {
  authStatus: string,
  userInfo: UserInfo
}

const Header: React.FC<Props> = (props: Props) => {
  const {
    authStatus,
    userInfo
  } = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={Routes.MAIN} className="header__logo-link">
              <img className="header__logo" src="../img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  to={authStatus === Authorization.NO_AUTH ? Routes.SIGN_IN : Routes.FAVORITES}
                  className="header__nav-link header__nav-link--profile"
                >
                  <div
                    className="header__avatar-wrapper user__avatar-wrapper"
                    style={{
                      backgroundImage: userInfo ? `url(${BASE_URL}${userInfo.avatarUrl})` : ``
                    }}
                  ></div>
                  {
                    authStatus === Authorization.NO_AUTH ?
                      <span className="header__login">Sign in</span>
                      :
                      <span className="header__user-name user__name">
                        {
                          userInfo ? userInfo.name : ``
                        }
                      </span>
                  }
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
  userInfo: getUserInfo(state)
});

export default connect(mapStateToProps)(Header);
