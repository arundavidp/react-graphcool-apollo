import React from 'react';
import { gql, graphql } from 'react-apollo';

import { channelsListQuery } from './ChannelsListWithData';

const AddChannel = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      mutate({ 
        variables: { name: evt.target.value },
        //refetchQueries: [ { query: channelsListQuery }]
        optimiticResponse: {
          __typename: "Mutation",
          addChannel: {
            id: Math.round(Math.random() * -1000000),
            name: evt.target.value,
            __typename: "Channel",
          }
        },
        update: (store, { data: { createChannel } }) => {
          const data = store.readQuery({query: channelsListQuery});
          console.log("data output");
          console.log(data);
          data.allChannels.push(createChannel);
          console.log("new data output");
          console.log(data);
          store.writeQuery({ query: channelsListQuery, data });
        }
      })
      .then( res => {
        evt.target.value = '';  
      });
    }
  };
return (
    <input
      type="text"
      placeholder="New channel"
      onKeyUp={handleKeyUp}
    />
  );
};
const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    createChannel(name: $name) {
      id
      name
    }
  }
`;
const AddChannelWithMutation = graphql(
  addChannelMutation
)(AddChannel);

export default AddChannelWithMutation;