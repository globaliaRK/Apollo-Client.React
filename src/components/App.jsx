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

    return (
        <div className="col-8 mx-auto ">
            <Router>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={SignUp} />
                    <div>
                        <NavBar />
                        <Route path="/home" exact component={Home} />
                        <Route path="/addPost" exact component={Login} />
                        <Route path="/dcs" exact component={Home} />
                    </div>
                    {/* <Redirect exact to="/home" from="/*" /> */}
                </Switch>
            </Router>
        </div>
    );
};

export default App;