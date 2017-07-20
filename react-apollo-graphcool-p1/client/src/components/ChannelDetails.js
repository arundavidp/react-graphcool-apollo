import React from 'react';
import MessageList from './MessageList';
import ChannelPreview from './ChannelPreview';
import NotFound from './NotFound';

import {
  gql,
  graphql
} from 'react-apollo';

const ChannelDetails = ({ data: {loading, error, Channel}, match }) => {
  if (loading) {
    return <ChannelPreview channelId={match.params.channelId}/>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (Channel===null) {
    return <NotFound />
  }
  
  return (
    <div>
      <div className="channelName">
        {Channel.name}
      </div>
      <MessageList messages={Channel.messages} /> 
    </div>
  );
}

export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId : ID!) {
    Channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

export default (graphql(channelDetailsQuery, {
  options: (props) => ({
    variables: { channelId: props.match.params.channelId }
  }),
})(ChannelDetails));