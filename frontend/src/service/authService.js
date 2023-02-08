import axios from 'axios';

const doLogIn = (username) => {
  localStorage.setItem("username", username);
  localStorage.setItem("isLoggedIn", true);
};

const isLoggedIn = () => {
  return Boolean(localStorage.getItem("isLoggedIn"));
};

const logOut = () =>{
  axios({
    method: 'GET',
    url: '/account/logout/',
  }).then(res => {
    if (res.data.success === "true"){
      localStorage.removeItem("username");
      localStorage.removeItem("isLoggedIn");
      window.location.reload();
    }
  }).catch(error => console.log(error));
};

export default {
  doLogIn,
  isLoggedIn,
  logOut
};
