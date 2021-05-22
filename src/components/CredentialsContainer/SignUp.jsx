import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gql, useMutation } from '@apollo/client';

const SignUp = () => {

    const history = useHistory();
    const [Token, setToken] = useState('');
    const [userData, setUserData] = useState({ firstName: null, mobileNumber: null, email: null, password: null, cpassword: null });
    const [setUserQL, { data, loading, error }] = useMutation(setUser, { variables: { ...userData } });

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            const { exp } = jwtDecode(localStorage.getItem('Token'));
            if (!(exp >= Date.now())) history.push('/')
        }
    }, [])

    useEffect(() => {
        if (data) {
            const { setUser } = data
            if (setUser?.Token) {
                localStorage.setItem('Token', setUser?.Token)
                setToken(setUser?.Token)
            }
        }
    }, [data])

    useEffect(() => {
        toast.error(error?.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
        })
    }, [error])

    useEffect(() => {
        if (Token) {
            window.localStorage.setItem('Token', Token)
            history.push('/')
        }
    }, [Token])

    const onSubmit = async () => {
        const { firstName, mobileNumber, email, password, cpassword } = userData;
        if (!firstName) {
            notify({ type: 'firstName', status: 'error' });
        } else if (!mobileNumber || mobileNumber.length !== 10) {
            notify({ type: 'mobileNumber', message: `${mobileNumber ? 'mobileNumber muast be 10 charactors' : 'mobileNumber not found'}`, status: 'error' });
        } else if (!email || !email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)) {
            notify({ type: 'email', message: `${email ? 'Not an email' : 'Email not found'}`, status: 'error' });
        } else if (!password) {
            notify({
                type: 'email',
                message: "Password not found",
                status: 'error'
            });
        } else if (!cpassword) {
            notify({
                type: 'email',
                message: "Conform Password not found",
                status: 'error'
            });
        } else if (password !== cpassword) {
            notify({
                type: 'email',
                message: "Password and Conform Password not match.",
                status: 'error'
            });
        } else {
            try {
                await setUserQL();
            } catch (e) {
                toast.error(e.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                })
            }
        }
    }
    const notify = ({ type, message = null, status }) => {
        console.log({ type, message, status });
        const notifyMessage = {
            'firstName': message || 'First Name not found.',
            'mobileNumber': message || 'Mobile Number not found.',
            'email': message || 'Mobile Number not found.',
        }
        return toast[status](notifyMessage[type], {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        })
    }

    return (
        <Fragment>
            <div className='py-5' style={{ textAlign: "center" }}>
                <h1>Sign Up</h1>
            </div>
            <form className="col-8 mx-auto">
                <div className="row">
                    <div className="col-6 form-group">
                        <label for="name">Your Name :-</label>
                        <input type="text" name='firstName' onChange={({ target }) => setUserData({ ...userData, [target.name]: target.value })} value={userData.firstName} className="form-control" id="name" />
                    </div>
                    <div className="col-6 form-group">
                        <label for="MobileNumber">Mobile Number :-</label>
                        <input type="number" name='mobileNumber' onChange={({ target }) => setUserData({ ...userData, [target.name]: target.value })} value={userData.mobileNumber} className="form-control" id="MobileNumber" />
                    </div>
                </div>
                <div className="form-group">
                    <label for="email">Your Email Address :-</label>
                    <input type="email" name='email' onChange={({ target }) => setUserData({ ...userData, [target.name]: target.value })} value={userData.email} className="form-control" id="email" />
                </div>
                <div className="row">
                    <div className="col-6 form-group">
                        <label for="password">Password :-</label>
                        <input type="password" name='password' onChange={({ target }) => setUserData({ ...userData, [target.name]: target.value })} value={userData.password} className="form-control" id="password" />
                    </div>
                    <div className="col-6 form-group">
                        <label for="cpassword">Confoorm Password :-</label>
                        <input type="password" name='cpassword' onChange={({ target }) => setUserData({ ...userData, [target.name]: target.value })} value={userData.cpassword} className="form-control" id="cpassword" />
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" onClick={onSubmit} className="btn btn-primary">Submit</button>
                    <button type="button" onClick={() => history.push('/login')} className="btn btn-secondary">Log In</button>
                </div>
            </form>
            <ToastContainer />
        </Fragment>
    );
};

const setUser = gql`
mutation SetUser($firstName: String!,$mobileNumber: String!,$email: String!,$password: String!){
  setUser(user:{firstName:$firstName,mobileNumber:$mobileNumber,email:$email,password:$password}){
  	_id
    Token
    ExpireTime
  }
}
`;

export default SignUp;