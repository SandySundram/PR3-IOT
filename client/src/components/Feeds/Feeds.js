import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const FEEDS_QUERY = gql`
query {
  feed
}
`;

const Feeds = () => (
  <Query query={FEEDS_QUERY}>
    {({ loading, data }) => {
      if (loading) {
        return null;
      }

      return (
        <div>
          <h3>{data.feed}</h3>
        </div>
      );
    }}
  </Query>
);

export default Feeds;


