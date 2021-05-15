import React, { useEffect, useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const CredentialsContainer = () => {

    const [status, setStatus] = useState(true);

    if (status) {
        return <Login setStatus={setStatus} />

    } else {
        return <SignUp setStatus={setStatus} />
    }
};

export default CredentialsContainer;