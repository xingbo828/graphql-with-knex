import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd';
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App';

const config = {
  space: 'large',
};

const client = new ApolloClient({
  uri: '/graphql',
})

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider {...config}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
