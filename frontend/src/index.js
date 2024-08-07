import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { AuthProvider } from './contexts/useAuth';
import store from './redux/store';
import { Provider } from 'react-redux'




const client = new ApolloClient({
  uri: 'http://localhost:9000/',
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: 'http://localhost:9000/graphql' }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
      <Provider store={store}>
       <AuthProvider> 
        <App />
      </AuthProvider>
      </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
