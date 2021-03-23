import * as React from 'react';
import map from 'lodash.map';

import { Container, GridContainer } from '../components/styled-shared';
import PokemonCard from '../components/pokemon-card';
import { usePokemon } from '../utils/contexts/pokemon-context';

export default function MyPokemons() {
  const [{ pokemonCatched }] = usePokemon();
  // const [myPokemons, setPokemons] = React.useState(() => JSON.parse(localStorage.getItem('myPokemons')), {});
  const [pokemons, setPokemons] = React.useState([]);
  // console.log(pokemons)

  React.useEffect(() => {
    setPokemons(map(pokemonCatched, (val, key) => ({
      ...val,
      nickname: key
    })))
    console.log(pokemonCatched)
  }, [pokemonCatched]);
  // TO DO : create release button on PokemonCard
  return (
    <Container>
      <GridContainer>
        {pokemons.length > 0 ? pokemons.map((pokemon, index) => (
          <PokemonCard key={pokemon.nickname} data={{ ...pokemon, index }} myPokemon />
        )) : (
          <h3>You haven't catch any pokemon yet.</h3>
        )}
      </GridContainer>
    </Container>
  );
}