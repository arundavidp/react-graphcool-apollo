import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({uri: 'https://api.graph.cool/simple/v1/cj5cyfgp7ex980122efsbal1n'}).use([{
      applyMiddleware(req, next) {
        setTimeout(next, 5000);
      }
    }])
  });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App min-vh-100">
          <div className="navbar flex items-center bt b--black-10 ph2 pv1 bg-lightest-blue navy tl lh-title fw2 f3">
            <img src={logo} className="h3 w3 mr1" alt="logo" />
            <div className="flex-auto">Welcome to Apollo</div>
          </div>
          <div className="main"><ChannelsListWithData /></div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
