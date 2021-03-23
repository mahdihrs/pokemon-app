import { InMemoryCache, ApolloClient } from '@apollo/client';

export default new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_BASE_URL,
  cache: new InMemoryCache()
});