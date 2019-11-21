import React, { useState }from "react";
import {Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Products from "./containers/Products";
import Signup from "./containers/Signup";
import NewProduct from "./containers/NewProduct";
import AppliedRoute from "./components/AppliedRoute";


export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/products" exact component={Products} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/products/new" exact component={NewProduct} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}