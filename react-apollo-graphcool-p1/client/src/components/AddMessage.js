import React from 'react';
import { gql, graphql } from 'react-apollo';
import { channelDetailsQuery } from './ChannelDetails';
import { withRouter } from 'react-router';

const AddMessage = ({ mutate, match }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      console.log(evt.target.value);
      mutate({
        variables: {
          channelId: match.params.channelId,
          text: evt.target.value
        },
        optimisticResponse: {
          createMessage: {
            text: evt.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Message',
          },
        },
        update: (store, { data: { createMessage } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({
            query: channelDetailsQuery,
            variables: {
              channelId: match.params.channelId,
            }
          });
          console.log(data);
          // Add our Message from the mutation to the end.
          data.Channel.messages.push(createMessage);
          // Write the data back to the cache.
          store.writeQuery({
            query: channelDetailsQuery,
            variables: {
              channelId: match.params.channelId,
            },
            data
          });
        },
      });
      evt.target.value = '';
    }
  };
  
  return (
    <div className="messageInput">
      <input type="text" placeholder="New message" onKeyUp={handleKeyUp} />
    </div>
  );
};

const addMessageMutation = gql`
  mutation addMessageAndConnectChannel($text: String!, $channelId: ID!) {
    createMessage(text: $text, channelId: $channelId) {
      id
      text
    }
  }
`;

const AddMessageWithMutation = graphql(
  addMessageMutation
)(withRouter(AddMessage));

export default AddMessageWithMutation;