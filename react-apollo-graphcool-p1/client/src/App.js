import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';

import {
  //ApolloClient,
  ApolloProvider,
} from 'react-apollo';

import { ApolloClient, createNetworkInterface } from 'apollo-client';

/*
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';

import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });
*/

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj434xa4hn9x00123fz32zfe4' });
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 5000);
  }
}])

const client = new ApolloClient({
  networkInterface
});



class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
