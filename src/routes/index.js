import {
  Pokemons,
  PokemonDetail,
  MyPokemon
} from '../pages';

const routes = [
  {
    title: 'Pokemons List',
    path: '/',
    exact: true,
    component: Pokemons,
  },
  {
    title: 'Pokemon Detail',
    path: '/pokemon/:id/:name',
    exact: true,
    component: PokemonDetail,
  },
  {
    title: 'My Pokemon',
    path: '/my-pokemon',
    exact: true,
    component: MyPokemon,
  }
];

export default routes;