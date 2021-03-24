import { InMemoryCache, ApolloClient } from '@apollo/client';

export default new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache()
});