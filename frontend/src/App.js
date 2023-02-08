import React from "react";
import "./styles.css";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import { Redirect, Route, Switch } from "react-router-dom";
import MenuApp from "./views/MenuApp";
import placingOrder from "./views/placingOrder";
import Notification from "./views/notificationComponent/Notification";
import SellerHomePage from "./views/SellerPageComponenets/SellerHomePage";
import authService from "./service/authService";
import Line from "./views/line/Line";
import LineForm from "./views/LineForm";
import Make from "./views/make/Make";
import MakeLine from "./views/line/MakeLine";
import Test from "./views/test/Test"
import AddMake from "./views/make/AddMake";
import Shows from "./views/show/Shows";



export default function App() {
  return (
    <>
      {authService.isLoggedIn() ?
        <>
          <MenuApp />
          <>
            <Switch>
              <Route path="/day-chuyen" component={Line} />
              <Route path="/lap-giap" component={Make} />
              {/* <Route path="/day-chuyen/line-1" component={MakeLine} /> */}
              <Route path="/san-xuat" component={AddMake} />
              <Route path="/van-hanh" component={MakeLine} />
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


