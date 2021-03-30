/** @jsx jsx */
import * as React from 'react';
import { jsx, css } from '@emotion/react';
import map from 'lodash.map';
import { useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_POKEMON_DETAIL, getPokemonDetailVariables } from '../../utils/queries';
import { usePokemon } from '../../utils/contexts/pokemon-context';
import { Container, PokemonCard, TopContainer } from './components';
import CatchButton from '../../components/catch-button';

export default function PokemonDetail() {
  const { name } = useParams();
  const [{ pokemonCatched }] = usePokemon();
  const [getPokemonDetail, { loading, error, data }] = useLazyQuery(GET_POKEMON_DETAIL);
  const myPokemonsName = map(pokemonCatched, (val) => val.name);
  const [isPokemonCatched, setIsPokemonCatched] = React.useState(() => myPokemonsName.find(pokemonName => pokemonName === name) ? true : false);
  const [pokemonName, setPokemonName] = React.useState('');
  const [types, setTypes] = React.useState([]);
  const [moves, setMoves] = React.useState([]);
  const pokemonToShow = data?.pokemon;

  React.useEffect(() => {
    getPokemonDetail({
      variables: getPokemonDetailVariables(name)
    })
    const pokemonTypes = data?.pokemon.types.map(pokemon => pokemon.type.name);
    const pokemonMoves = data?.pokemon.moves.map(pokemon => pokemon.move.name);
    setTypes(pokemonTypes);
    setMoves(pokemonMoves);
  }, [getPokemonDetail, name, data])

  React.useEffect(() => {
    if (pokemonCatched?.[pokemonName]?.name) {
      setIsPokemonCatched(true);
    }
  }, [pokemonCatched, name, pokemonName]);

  if (error) throw new Error(`Error! ${error.message}`);
  console.log(loading, data)

  return (
    <Container>
      {loading || !data ?
        <h1>Loading...</h1> :
        (
          <PokemonCard>
            <TopContainer>
              <img
                src={pokemonToShow?.sprites.front_default}
                alt={pokemonToShow?.name}
                css={css`height: 200px;`}
              />
              <h1>{pokemonToShow?.name}</h1>
              <CatchButton
                name={name}
                isPokemonCatched={isPokemonCatched}
                setPokemonName={setPokemonName}
                data={data}
              />
            </TopContainer>
            <h2>Types</h2>
            <ul>{types?.map(type => <li key={type}>{type}</li>)}</ul>
            <h2>Moves</h2>
            <ul>{moves?.map(move => <li key={move}>{move}</li>)}</ul>
          </PokemonCard>
        )
      }
    </Container>
  );
}
