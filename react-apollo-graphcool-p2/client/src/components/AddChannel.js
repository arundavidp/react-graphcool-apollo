import React from 'react';
import { gql, graphql } from 'react-apollo';
import { channelsListQuery } from './ChannelsListWithData';

const AddChannel = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      console.log(evt.target.value);
      mutate({
        variables: { name: evt.target.value },
        refetchQueries: [{ query: channelsListQuery }],
      })
      .then( res => {
        evt.target.value = '';
      })
    }
  };
  
  return (
    <div className="addchannel relative">
      <div className="plus-button absolute dib h1 w1 black-60">+</div>
      <input type="text" placeholder="New Channel" className="newchannel relative pt2 pb2 pl4 pr3 outline-0 bg-transparent w-20 black fw3 f5" onKeyUp={handleKeyUp} />
    </div>
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