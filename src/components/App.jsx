import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './CredentialsContainer/Login';
import SignUp from './CredentialsContainer/SignUp';
import NavBar from './NavBar';
import AddPost from './AddPost';

const logRoutes = [
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

const accessRoutes = [
    {
        path: "/home",
        exact: true,
        component: Home
    },
    {
        path: "/addPost",
        exact: true,
        component: AddPost
    },
    {
        path: "/dcs",
        exact: true,
        component: Home
    }
]

const App = () => {

    const [isLoging, setLogin] = useState(localStorage.getItem('login'));
    console.log(isLoging);
    return (
        <div className="col-8 mx-auto ">
            <Router>
                <NavBar />
                <Switch>
                    {!isLoging && <Route {...logRoutes[0]} /> || <Route {...accessRoutes[0]} />}
                    {!isLoging && <Route {...logRoutes[1]} /> || <Route {...accessRoutes[0]} />}
                    {isLoging && <Route {...accessRoutes[1]} /> || <Route {...logRoutes[0]} />}
                    {isLoging && <Route {...accessRoutes[2]} /> || <Route {...logRoutes[0]} />}
                    {isLoging && <Route {...accessRoutes[3]} /> || <Route {...logRoutes[0]} />}
                    <Redirect exact to="/home" from="/*" />
                </Switch>
            </Router>
        </div>
    );
};

export default App;