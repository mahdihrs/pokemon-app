import PokemonList from '../pages/pokemons';
import PokemonDetail from '../pages/pokemon-detail/pokemon-detail';
import MyPokemon from '../pages/my-pokemon';

const routes = [
  {
    title: 'Pokemons List',
    path: '/',
    exact: true,
    component: PokemonList,
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
// const routes = {
//   pokemon: {
//     title: 'Pokemons List',
//     path: '/',
//     exact: true,
//     component: PokemonList,
//   },
//   pokemonDetail: {
//     title: 'Pokemon Detail',
//     path: '/pokemon/:name',
//     exact: true,
//     component: PokemonDetail,
//   },
//   myPokemon: {
//     title: 'My Pokemon',
//     path: '/my-pokemon',
//     exact: true,
//     component: MyPokemon,
//   },
// };

export default routes;