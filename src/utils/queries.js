import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

export const getPokemonsVariables = ({ limit, offset } = {}) => ({
  limit: limit || 5,
  offset: offset || 1
});

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

export const getPokemonDetailVariables = (name) => {
  return name ? { name } : 'Please provide a name to get pokemon detail!'
}