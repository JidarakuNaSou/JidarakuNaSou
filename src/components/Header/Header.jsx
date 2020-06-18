import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import SignUserTogglerContainer from "./SignUserToggler/SignUserTogglerContainer";

export default function Header(props) {

  useEffect(() => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id:
            "1054236151850-g3o9e7paoi2novftkh56056jtrlnehkr.apps.googleusercontent.com"
        })
        .then(googleAuth => {
          console.log(googleAuth.isSignedIn.get());
          if (googleAuth.isSignedIn.get()) {
            const googleUser = googleAuth.currentUser.get();
            const profile = googleUser.getBasicProfile();
            props.setUserData(
              profile.getFamilyName(),
              profile.getGivenName(),
              profile.getImageUrl()
            );
            props.setUser("user", true);
          }
        });
    });
  });
  return (
    <header className="header row">
      <div className="header_logo col col-sm-2 " >
        <ul className="header__items">
          <li className="header__item">
            <NavLink exact to="/">
              <img
                src="img/logo.svg"
                className="header__logo "
                whidth="41"
                hight="35"
                alt=""
              />
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="header__nav__search col-sm-5 d-flex">
        <input class="search" type="search" placeholder="ПОИСК" />
        <button type="button" className="search__btn btns">
          <img src="img/btn_search.svg" alt="" />
        </button>
      </div>

      <div className="header__nav col-12 col-sm-2">
        <ul className="header__nav__items d-flex justify-content-end">
          <li className="header__nav__item">
            <NavLink exact to="/">
              ГЛАВНАЯ
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="overw col-12 col-sm-1">
        <div class="dropdown open">
          <button
            class="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            ОБЗОР
          </button>
          <div
            class="dropdown-menu shadow dropdown-menu-center"
            aria-labelledby="dropdownMenuButton"
          >
            <NavLink exact to="/Apartments">
              <button class="dropdown-item">КВАРТИРЫ</button>
            </NavLink>
            <NavLink exact to="/Office">
              <button class="dropdown-item">ОФИСЫ</button>
            </NavLink>
            <NavLink exact to="/House">
              <button class="dropdown-item">ЗАГОРОД</button>
            </NavLink>
            <NavLink exact to="/Etc">
              <button class="dropdown-item">ПРОЧЕЕ</button>
            </NavLink>
          </div>
        </div>
      </div>

      <SignUserTogglerContainer />
    </header>
  );
}
