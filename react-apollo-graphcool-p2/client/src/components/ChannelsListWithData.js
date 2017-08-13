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
      <div className="channelsList pv0 ph4">
        <AddChannel />
        {allChannels.map(ch => (<div key={ch.id} className={"channel relative pt2 pb2 pl4 pr3 bb b--black-10 w-20 tl f5" + (ch.id < 0 ? ' red fw1 ' : ' black-80 fw3 ')}>{ch.name}</div>))}
      </div>
    );
  };
  
export const channelsListQuery = gql`
  query ChannelsListQuery {
    allChannels {
      id
      name
    }
  }
`

export default graphql(channelsListQuery, {
  options: { pollInterval: 15000 },
})(ChannelsList);