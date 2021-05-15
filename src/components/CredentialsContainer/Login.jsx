import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router';



const Login = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Token, setToken] = useState('');
    const [getToken, { loading, error, data }] = useLazyQuery(EXCHANGE_RATES, { variables: { email, password } });

    useEffect(() => {
        const token = window.localStorage.getItem('Token')
        if (token) {
            history.push('/home');
        }
    }, [])

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
        if (Token) {
            window.localStorage.setItem('Token', Token.Token)
            history.push('/home')
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
                <button onClick={OnClick} type="button" class="btn btn-primary">{
                    loading ?
                        <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden"></span>
                        </div>
                        : 'Submit'
                }</button>
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