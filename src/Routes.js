import React, { useState }from "react";
import {Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import NewProduct from "./containers/NewProduct";
import AppliedRoute from "./components/AppliedRoute";


export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Login} appProps={appProps} />
            <AppliedRoute path="/products" exact component={Products} appProps={appProps} />
            <AppliedRoute path="/orders" exact component={Orders} appProps={appProps} />
            <AppliedRoute path="/products/new" exact component={NewProduct} appProps={appProps} />
            { /* Finally, catch all unmatched routes */ }
            <Route component={NotFound} />
        </Switch>
    );
}