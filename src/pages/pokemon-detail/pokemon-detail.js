/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { jsx, css } from '@emotion/react';
import map from 'lodash.map';
import { useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_POKEMON_DETAIL, getPokemonDetailVariables } from '../../utils/queries';
import { usePokemon, CATCH_POKEMON } from '../../utils/contexts/pokemon-context';
import { Container, PokemonCard, TopContainer, CatchButton } from './components';
import pokeballBW from '../../assets/icons/pokeball-bw.svg';
import pokeball from '../../assets/icons/pokeball.svg';
import pokeballAnimated from '../../assets/lotties/catch-in-progress.json';
import Lottie from '../../components/lottie';
import {
  catchAnotherPokemonAndGiveNickname,
  showModalAndGiveNickname,
  failedToCatchPokemon,
  nicknameDuplicate
} from '../../utils/alerts';

export default function PokemonDetail() {
  const { name } = useParams();
  const [{ pokemonCatched }, dispatch] = usePokemon();
  const [getPokemonDetail, { loading, error, data }] = useLazyQuery(GET_POKEMON_DETAIL);
  const myPokemonsName = map(pokemonCatched, (val) => val.name);
  const [isPokemonCatched, setIsPokemonCatched] = React.useState(() => myPokemonsName.find(pokemonName => pokemonName === name) ? true : false);
  const [pokemonName, setPokemonName] = React.useState('');
  const [catchInProgress, setCatchInProgress] = React.useState(false);
  const pokemonToShow = data?.pokemon;
  const [types, setTypes] = React.useState([]);
  const [moves, setMoves] = React.useState([]);

  React.useEffect(() => {
    getPokemonDetail({
      variables: getPokemonDetailVariables(name)
    })
    const pokemonTypes = data?.pokemon.types.map(pokemon => pokemon.type.name);
    const pokemonMoves = data?.pokemon.moves.map(pokemon => pokemon.move.name);
    setTypes(pokemonTypes);
    setMoves(pokemonMoves);
  }, [getPokemonDetail, name, data])

  const handleClick = () => {
    const isCatchSucceed = Math.floor(Math.random() * (2 - 0) + 0);
    if (!pokemonCatched[name]) {
      if (isPokemonCatched) {
        catchAnotherPokemon();
      } else {
        setCatchInProgress(true);
        setTimeout(() => {
          // pokeball animated
          setCatchInProgress(false);
        }, 2000);
        if (!catchInProgress && isCatchSucceed) {
          givePokemonNickname();
        } else if (!catchInProgress && !isCatchSucceed) {
          failedToCatchPokemon();
        }
      }
    }
  }

  const catchAnotherPokemon = async () => {
    const confirmedToCatch = await catchAnotherPokemonAndGiveNickname();
    if (confirmedToCatch) {
      givePokemonNickname();
    }
  }

  const givePokemonNickname = async () => {
    const newNickname = await showModalAndGiveNickname();
    const isNicknameDuplicate = Object.keys(pokemonCatched).find(nickname => nickname === newNickname);

    if (newNickname && !isNicknameDuplicate) {
      setPokemonName(newNickname);
      dispatch({
        type: CATCH_POKEMON,
        pokemonToCatch: {
          [newNickname]: data?.pokemon
        }
      })
      localStorage.setItem('myPokemons', JSON.stringify({ ...pokemonCatched, [newNickname]: data?.pokemon }));
    } else if (newNickname && isNicknameDuplicate) {
      nicknameDuplicate();
    }
  }

  React.useEffect(() => {
    if (pokemonCatched?.[pokemonName]?.name) {
      setIsPokemonCatched(true);
    }
  }, [pokemonCatched, name, pokemonName]);

  if (loading) return 'Loading...';
  if (error) throw new Error(`Error! ${error.message}`);

  return (
    <Container>
      <PokemonCard>
        <TopContainer>
          <img
            src={pokemonToShow?.sprites.front_default}
            alt={pokemonToShow?.name}
            css={css`height: 200px;`}
          />
          <h1>{pokemonToShow?.name}</h1>
          <CatchButton onClick={handleClick}>
            {catchInProgress ? (<Lottie animationData={pokeballAnimated} />) : (
              <img src={isPokemonCatched ? pokeball : pokeballBW} alt="pokeball" height="50px" />)}
          </CatchButton>
        </TopContainer>
        <h2>Types</h2>
        <ul>{types?.map(type => <li key={type}>{type}</li>)}</ul>
        <h2>Moves</h2>
        <ul>{moves?.map(move => <li key={move}>{move}</li>)}</ul>
      </PokemonCard>
    </Container>
  );
}
