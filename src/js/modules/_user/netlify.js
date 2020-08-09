/*eslint no-console: "off" */

import user from "netlify-identity-widget";
import md5 from "md5";
import store from "store";
import {getUser} from "../_util/url";
import {getString} from "../_language/lang";

let login_state_key = "login.state";
let userInfo;

let testUsers = {
  "rick": {
    email: "rmercer33@gmail.com",
    userId: md5("rmercer33@gmail.com"),
    name: "Rick Mercer",
    roles: ["acol", "timer", "editor"]
  },
  "julie": {
    email: "julief8@me.com",
    userId: md5("julief8@me.com"),
    name: "Julie Franklin",
    roles: ["timer", "editor"]
  },
  "yodi": {
    email: "yodi@yodith.com",
    userId: md5("yodi@yodith.com"),
    name: "Yodi Debebe",
    roles: ["timer"]
  },
  "hettie": {
    email: "hcmercer@gmail.com",
    userId: md5("hcmercer@gmail.com"),
    name: "Hettie Mercer",
    roles: []
  }
};

function devUserInfo() {
  let user = getUser();

  if (user && testUsers[user]) {
    return testUsers[user];
  }
  else {
    //use rick
    return testUsers["rick"];
  }

  return null;
}

function prodUserInfo() {
  if (userInfo) {
    return {
      email: userInfo.email,
      userId: md5(userInfo.email),
      name: userInfo.user_metadata.full_name,
      roles: userInfo.app_metadata.roles,
      avatar_url: userInfo.user_metadata.avatar_url
    };
  }

  return null;
}

export function getUserInfo(name) {
  return prodUserInfo();
}

/*
  Modify menubar icons "bookmark" and "sign in" to
  indicate user is signed in
*/
function setAsSignedIn() {
  let userInfo = getUserInfo();

  //change sign-in icon to sign-out and change color from red to green
  getString("action:signout", true).then((resp) => {
    $(".login-menu-option > span")
      .html("<i class='green sign out icon'></i>")
      .attr("data-tooltip", `${resp}: ${userInfo.name}`);
  });

  //change bookmark menu icon to green from red
  $(".main.menu a > span > i.bookmark.icon")
    .addClass("green")
    .removeClass("red");

  //add color to menu background to further indicate signed in status
  $(".main.menu .ui.text.container").addClass("signed-in");

  //reveal profile-management menu option
  $(".hide.profile-management.item").removeClass("hide");
}

/*
  Modify menubar icons "bookmark" and "sign in" to
  indicate user is signed in
*/
function setAsSignedOut() {
  //change sign-in icon to sign-out and change color from red to green
  getString("action:signin", true).then((resp) => {
    $(".login-menu-option > span")
      .html("<i class='red sign in icon'></i>")
      .attr("data-tooltip", resp);
  });

  //change bookmark menu icon to green from red
  $(".main.menu a > span > i.bookmark.icon")
    .addClass("red")
    .removeClass("green");

  //removed signed-in class
  $(".main.menu .ui.text.container").removeClass("signed-in");

  //hide profile-management menu option
  $(".profile-management.item").addClass("hide");
}

/*
  ACOL restricts access to some contents based on the "acol" user role. When the user
  logs in, redirect them to the acol home page if they are currently viewing an acol
  transcript page. This will ensure that the TOC will give them access to all content.

  Otherwise they can just stay where they are on login.
*/
function manageState(state) {
  const acolHome = "/t/acol/";
  let currentState = store.get(login_state_key) || "init";

  switch(state) {
    case "init":
      //state 'init' on page load
      store.set(login_state_key, state);
      break;
    case "dialog":
      store.set(login_state_key, state);
      break;
    case "login":
      if (currentState === "dialog") {
        //if user has "acol" role, refresh page to enable access to all content
        if (userInfo.app_metadata.roles && userInfo.app_metadata.roles.find(r => r === "acol")) {
          //if user is on an acol transcript page
          if (location.pathname.startsWith(acolHome) && location.pathname !== acolHome) {
            //refresh page
            location.href = acolHome;
          }
        }
      }
      store.set(login_state_key, state);
      break;
  }
}

export default {

  initialize: function() {
    /*
     * if user already logged in, change icon to log out
     */
    user.on("init", user => {
      manageState("init");
    });

    user.on("login", login => {
      userInfo = login;
      setAsSignedIn();
      manageState("login");
    });

    user.on("logout", () => {
      setAsSignedOut();
      userInfo = null;
      location.href = "/";
    });

    user.on("error", (err) => {
      console.error("user.on('error'): ", err);
    });

    $(".login-menu-option").on("click", (e) => {
      e.preventDefault();

      if (userInfo) {
        user.logout();
      }
      else {
        manageState("dialog");
        user.open();
      }
    });

    //init authentication
    user.init({});
  }
};

