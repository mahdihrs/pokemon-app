import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const PokemonContext = createContext();
PokemonContext.displayName = 'PokemonContext';

export const CACHED_POKEMONS = 'pokemon/detail/set-cached-all-pokemons';
export const CACHED_POKEMON_DETAIL = 'pokemon/detail/set-cached';
export const CATCH_POKEMON = 'pokemon/detail/catch-pokemon';
export const RELEASE_POKEMON = 'pokemon/detail/release-pokemon';
export const SET_NEW_ITEMS_TO_SHOW = 'pokemon/set-pokemons-total-to-show';

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case CACHED_POKEMONS:
      return {
        ...state,
        pokemons: action.pokemons
      }
    case CACHED_POKEMON_DETAIL:
      return {
        ...state,
        pokemonCached: {
          ...state.pokemonCached,
          ...action.pokemonToCache
        }
      }
    case CATCH_POKEMON:
      return {
        ...state,
        pokemonCatched: {
          ...state.pokemonCatched,
          ...action.pokemonToCatch
        }
      }
    case RELEASE_POKEMON:
      return {
        ...state,
        pokemonCatched: action.pokemonToCatch
      }
    case SET_NEW_ITEMS_TO_SHOW:
      return {
        ...state,
        limit: action.limit
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, {
    pokemons: null,
    pokemonDetail: null,
    pokemonCatched: JSON.parse(localStorage.getItem('myPokemons') || '{}'),
    pokemonCached: {},
    limit: 10
  })

  const value = React.useMemo(() => [state, dispatch], [state]);
  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
}

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
}

PokemonProvider.propTypes = {
  children: PropTypes.node
}