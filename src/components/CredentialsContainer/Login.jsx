import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

const Login = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Token, setToken] = useState('');
    const [getToken, { loading, error, data }] = useLazyQuery(EXCHANGE_RATES, { variables: { email, password } });

    const OnClick = (e) => {
        e.preventDefault()
        getToken();
        if (data) {
            const { loginUser = {} } = data;
            if (loginUser) {
                setToken({ ...loginUser });
            }
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            const { exp } = jwtDecode(localStorage.getItem('Token'));
            if (!(exp >= Date.now())) history.push('/')
        }
    }, [])
    useEffect(() => {
        if (Token) {
            window.localStorage.setItem('Token', Token.Token)
            history.push('/')
        }
    }, [Token])

    return (
        <><div className='py-5' style={{ textAlign: "center" }}>
            <h1>Login Up</h1>
        </div>
            {error && <div class="col-8 mx-auto alert alert-danger" role="alert">{error.toString()}</div>}
            <form className="col-8 mx-auto">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" value={email} onChange={({ target }) => setEmail(target.value)} name="email" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" value={password} onChange={({ target }) => setPassword(target.value)} name="email" />
                </div>
                <div className="d-flex justify-content-between">
                    <button onClick={OnClick} type="button" class="btn btn-primary">{
                        loading ?
                            <div class="spinner-border text-light" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                            : 'Submit'
                    }</button>
                    <button type="button" onClick={() => history.push('/signup')} className="btn btn-primary">Sign Up</button>
                </div>
            </form>
        </>
    );
};

const EXCHANGE_RATES = gql`
query($email: String!,$password: String!){
  loginUser(email:$email,password:$password){
   	_id
    Token
    ExpireTime
  }
}
`;

export default Login;