import React from 'react';
import AddChannel from './AddChannel';

import {
  gql,
  graphql
} from 'react-apollo';

const ChannelsList = ({data: {allChannels, error, loading}}) => {
    if (loading) {
      return <p>Loading ...</p>
    }
    if (error) {
      return <p>{error.message}</p>
    }
    
    return (
      <ul className="list pl0 mt0">
        <li className="pt2 pb2 pl3 pr3 bb b--black-10 black-80 fw4 w-20 tl"><AddChannel /></li>
        {allChannels.map(ch => (<li key={ch.id} className="pt2 pb2 pl3 pr3 bb b--black-10 black-80 fw4 w-20 tl">{ch.name}</li>))}
      </ul>
    );
  };
  
const channelsListQuery = gql`
  query ChannelsListQuery {
    allChannels {
      id
      name
    }
  }
`

export default graphql(channelsListQuery)(ChannelsList);