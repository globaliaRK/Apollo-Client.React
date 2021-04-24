import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import NavBar from './NavBar';

const routes = [
    {
        path: "",
        exact: true,
        component: Home
    },
    {
        path: "/login",
        exact: true,
        component: Login
    },
    {
        path: "/signup",
        exact: true,
        component: SignUp
    }
]

const App = () => {

    return (
        <div className="col-8 mx-auto ">
            <Router>
                <NavBar />
                <Switch>
                    {routes.map((route, i) => <Route key={i} {...route} />)}
                    <Redirect exact to="/" from="/*" />
                </Switch>
            </Router>
        </div>
    );
};

export default App;