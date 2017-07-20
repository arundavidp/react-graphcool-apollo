import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({uri: 'https://api.graph.cool/simple/v1/cj5cyfgp7ex980122efsbal1n'})
  });

const ChannelsList = ({data: {allChannels, error, loading}}) => {
    if (loading) {
      return <div className="ph3 ph5-ns pb5 bg-yellow black-70"><p>Loading ...</p></div>
    }
    if (error) {
      return <div className="ph3 ph5-ns pb5 bg-yellow black-70"><p>{error.message}</p></div>
    }
    
    return (
      <div className="ph3 ph5-ns pb5 bg-yellow black-70">
        <ul className="list pl0">
          {allChannels.map(ch => (<li key={ch.id} className="pt2 pb2 pl3 pr3 bb b--black-10 black-80 fw4 w-20 tl">{ch.name}</li>))}
        </ul>
      </div>);
  };
  
const channelsListQuery = gql`
  query ChannelsListQuery {
    allChannels {
      id
      name
    }
  }
`

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="h-auto-ns bt b--black-10 pa3 pa5-ns bg-lightest-blue navy">
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
