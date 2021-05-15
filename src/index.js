import { ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import App from './components/App';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    headers: { authorization: `Bearer ${localStorage.getItem('Token')}` }
});

render(<ApolloProvider client={client} ><App /></ApolloProvider>, document.getElementById('root'));
