import React from 'react';

import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav class="p-2 navbar navbar-expand-lg navbar-light bg-light">
            <Link class="mx-5 navbar-brand" to="/">Navbar</Link>
            <div class="mx-5 collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="p-2 nav-item active">
                        <Link class="nav-link" to="/">Home</Link>
                    </li>
                    <li class="p-2 nav-item active">
                        <Link class="nav-link" to="/addPost">addPost</Link>
                    </li>
                    <li class="p-2 nav-item active">
                        <Link class="nav-link" to="/dcs">dcs</Link>
                    </li>
                    <li class="p-2 nav-item active">
                        <Link class="nav-link" to="/login">Log In</Link>
                    </li>
                    <li class="p-2 nav-item active">
                        <Link class="nav-link" to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;