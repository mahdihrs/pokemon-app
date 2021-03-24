import { lazy } from 'react';

export const Pokemons = lazy(() => import('./pokemons'));
export const PokemonDetail = lazy(() => import('./pokemon-detail'));
export const MyPokemon = lazy(() => import('./my-pokemon'));
