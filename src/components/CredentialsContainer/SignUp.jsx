import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const SignUp = () => {

    const history = useHistory();
    useEffect(() => {
        const token = window.localStorage.getItem('Token')
        if (token) {
            history.push('/home');
        }
    }, [])

    return (
        <>
            <div className='py-5' style={{ textAlign: "center" }}>
                <h1>Sign Up</h1>
            </div>
            <form className="col-8 mx-auto">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>

                <button type="button" class="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default SignUp;