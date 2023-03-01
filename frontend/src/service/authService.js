import axios from 'axios';

const doLogIn = (user) => {
  localStorage.setItem("username", user.username);
  localStorage.setItem("admin", user.is_superuser);
  localStorage.setItem("position", user.first_name);
  localStorage.setItem("isLoggedIn", true);
};

const isLoggedIn = () => {
  return Boolean(localStorage.getItem("isLoggedIn"));
};

const userAccess = () => {
  return {
    username: localStorage.getItem("username"),
    admin: localStorage.getItem("admin"),
    position: localStorage.getItem("position"),
  };
};

const logOut = () => {
  axios({
    method: 'GET',
    url: '/account/logout/',
  }).then(res => {
    if (res.data.success === "true") {
      localStorage.removeItem("username");
      localStorage.removeItem("isLoggedIn");
      window.location.reload();
    }
  }).catch(error => console.log(error));
};

export default {
  doLogIn,
  isLoggedIn,
  logOut,
  userAccess
};
