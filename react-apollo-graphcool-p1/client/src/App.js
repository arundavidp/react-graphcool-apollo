import React, { Component } from 'react';

import {
  BrowserRouter,
  Link,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';
import NotFound from './components/NotFound';
import ChannelDetails from './components/ChannelDetails';

import {
  //ApolloClient,
  ApolloProvider,
  toIdValue,
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
    setTimeout(next, 500);
  }
}])

function dataIdFromObject (result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface,
  customResolvers: {
    Query: {
      channel: (_, args) => {
        return toIdValue(dataIdFromObject({ __typename: 'Channel', id: args['id'] }))
      },
    },
  },
  dataIdFromObject,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
       <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">React + GraphQL Tutorial</Link>
            <Switch>
              <Route exact path="/" component={ChannelsListWithData}/>
              <Route path="/channel/:channelId" component={ChannelDetails}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
