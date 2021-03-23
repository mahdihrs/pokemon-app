import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import map from 'lodash.map';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_POKEMON_DETAIL, getPokemonDetailVariables } from '../../utils/queries';
import { usePokemon, CACHED_POKEMON_DETAIL, CATCH_POKEMON } from '../../utils/contexts/pokemon-context';
// import { PokemonDetailProvider } from '../../utils/contexts/pokemon-detail-context';
import {
  Container,
  PokemonCard,
  TopContainer,
  CatchButton
} from './components';
// import CatchButton from '../../components/catch-button';
import pokeballBW from '../../assets/icons/pokeball-bw.svg';
import pokeball from '../../assets/icons/pokeball.svg';
import pokeballAnimated from '../../assets/lotties/catch-in-progress.json';
import defaultLottiesOptions from '../../utils/lotties';
import {
  catchAnotherPokemonAndGiveNickname,
  showModalAndGiveNickname,
  failedToCatchPokemon,
  nicknameDuplicate
} from '../../utils/alerts';

export default function PokemonDetail() {
  const match = useParams();
  // console.log(match, 'match')
  const name = match?.name;
  const [{ pokemonCached, pokemonCatched }, dispatch] = usePokemon();
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: getPokemonDetailVariables(name)
  });
  const myPokemonsName = map(pokemonCatched, (val, key) => val.name);
  const [isPokemonCatched, setIsPokemonCatched] = useState(() => myPokemonsName.find(pokemonName => pokemonName === name) ? true : false);
  const [pokemonName, setPokemonName] = useState('');
  const [catchInProgress, setCatchInProgress] = useState(false);
  const pokemonToShow = pokemonCached[name] || data?.pokemon;
  const types = pokemonToShow?.types.map(pokemon => pokemon.type.name);
  const moves = pokemonToShow?.moves.map(pokemon => pokemon.move.name);

  useEffect(() => {
    if (data && !pokemonCached[name]) {
      dispatch({
        type: CACHED_POKEMON_DETAIL,
        pokemonToCache: {
          [name]: data?.pokemon
        }
      })
    }
  }, [data, dispatch, name, pokemonCached]);

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
    const isNicknameDuplicate = Object.keys(pokemonCatched).find(nickname => nickname === newNickname );

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

  useEffect(() => {
    if (pokemonCatched?.[pokemonName]?.name) {
      setIsPokemonCatched(true);
    }
  }, [pokemonCatched, name, pokemonName]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  // console.log(pokemonToShow, 'data')
  console.log(data, 'data pok')

  return (
    <Container>
      {/* <PokemonDetailProvider> */}
      <PokemonCard>
        <TopContainer>
          {/* // TO DO style={{}} */}
          <img src={pokemonToShow?.sprites.front_default} alt={pokemonToShow?.name} style={{ height: '200px' }} />
          <h1>{pokemonToShow?.name}</h1>
          {/* <CatchButton /> */}
          <CatchButton onClick={handleClick}>
            {catchInProgress ? (
              <Lottie
                options={defaultLottiesOptions({ animationData: pokeballAnimated })}
                height={50}
                width={50}
                speed={0.35}
              />
            ) : (
              <img src={isPokemonCatched ? pokeball : pokeballBW} alt="pokeball" height="50px" />
            )}
          </CatchButton>
        </TopContainer>
        <h2>Types</h2>
        <ul>{types.map(type => <li key={type}>{type}</li>)}</ul>
        <h2>Moves</h2>
        <ul>{moves.map(move => <li key={move}>{move}</li>)}</ul>
      </PokemonCard>
      {/* </PokemonDetailProvider> */}
    </Container>
  );
}