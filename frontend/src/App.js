import React from "react";
import "./styles.css";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import { Redirect, Route, Switch } from "react-router-dom";
import MenuApp from "./views/MenuApp";
import authService from "./service/authService";
import Line from "./views/line/Line";
import Make from "./views/make/Make";
import MakeLine from "./views/line/MakeLine";
import AddMake from "./views/make/AddMake";
import Shows from "./views/show/Shows";
import ListUser from "./views/user/ListUser";
import ManagerLine from "./views/user/ManagerLine";
import AddQr from "./views/make/AddQr";
import Monitor from "./views/monitor/Monitor";


export default function App() {
  return (
    <>
      {authService.isLoggedIn() ?
        <>
          <MenuApp />
          <>
            <Switch>
              <Route path="/giam-sat" component={Monitor} />
              <Route path="/day-chuyen" component={Line} />
              <Route path="/lap-giap" component={Make} />
              <Route path="/san-xuat" component={AddMake} />
              <Route path="/van-hanh" component={MakeLine} />
              <Route path="/nhan-vien" component={ListUser} />
              <Route path="/quan-ly-chung" component={ManagerLine} />
              <Route path="/quet-qr" component={AddQr} />
              <Route path="/" component={Shows} />
            </Switch>
          </>

        </>
        :
        <Switch>
          <Route path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Redirect to="/login" />
        </Switch>
      }
    </>
  );
}


