import React from 'react';
import {
  Link
} from 'react-router-dom';

import AddChannel from './AddChannel';

import {
  gql,
  graphql,
} from 'react-apollo';

const ChannelsList = ({ data: {loading, error, allChannels}}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  
  return (
  <div className="channelsList">
    <AddChannel />
    { allChannels.map( ch => (<div key={ch.id} className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>
      <Link to={ch.id < 0 ? `/` : `/channel/${ch.id}`}>{ch.name}</Link>
    </div>)) }
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
`;

export default  graphql(channelsListQuery, { options: { pollInterval: 5000 }})(ChannelsList);